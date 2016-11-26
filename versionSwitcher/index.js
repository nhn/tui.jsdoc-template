'use strict';

var fs = require('jsdoc/fs');
var path = require('jsdoc/path');
var Promise = require('bluebird');
var gitSemverTags = Promise.promisify(require('git-semver-tags'));
var semver = require('semver');
var _ = require('lodash');
var semverTruncate = require('semver-truncate');

/**
 * Generates the index.html, the versionsSwitcher directory and its contents in
 * the output directory.
 * @param  {String} outputDir      Path to the output folder for the generated documentation
 * @param  {String} currentVersion Current version from package.json
 * @param  {String} pageTitle      Used as content of the <title> element of the page
 * @param  {Array} semverRanges    Array of semver ranges from JSDoc config property versionSwitcher.versions
 * @param  {String} excludeLevel   Exclude level from JSDoc config property versionSwitcher.versions
 */
module.exports = function (outputDir, currentVersion, pageTitle, semverRanges, excludeLevel) {
    var staticJSDocTemplateDir = path.normalize(path.join(__dirname, '../static'));
    var versionSwitcherOutputDir;
    var staticVersionSwitcherDir;
    var versionSwitcherData = {
        currentVersion: currentVersion,
        pageTitle: pageTitle
    };

    // Prepare directories
    outputDir = path.normalize(outputDir);
    fs.mkdirSync(path.join(outputDir, 'versionSwitcher'));
    versionSwitcherOutputDir = path.normalize(path.join(outputDir, 'versionSwitcher'));
    staticVersionSwitcherDir = path.normalize(__dirname + '/static');

    // Copy files from `/static` to {outputDir}/versionSwitcher
    fs.copyFileSync(path.normalize(staticJSDocTemplateDir + '/scripts/jquery.min.js'), versionSwitcherOutputDir);
    fs.copyFileSync(path.normalize(staticJSDocTemplateDir + '/styles/bootstrap.min.css'), versionSwitcherOutputDir);

    // Copy index.html from `/versionSwitcher/static` to {outputDir}
    fs.copyFileSync(path.normalize(staticVersionSwitcherDir + '/index.html'), outputDir);

    // Copy files from `/versionSwitcher/static` to {outputDir}/versionSwitcher
    fs.copyFileSync(path.normalize(staticVersionSwitcherDir + '/versionSwitcher.css'), versionSwitcherOutputDir);
    fs.copyFileSync(path.normalize(staticVersionSwitcherDir + '/versionSwitcher.js'), versionSwitcherOutputDir);

    // Get versions from Git tags
    gitSemverTags().then(function(semverTags){
        return semverTags;
    }).then(function(semverTags) {
        var selectedVersions = semverTags;

        // Filter by versions if versionSwitcher.versions
        if (semverRanges) {
            selectedVersions = _.chain(semverRanges)
                                .map(function(semverRange){
                                    return _.filter(semverTags, function(semverTag){
                                        return semver.satisfies(semverTag, semverRange) === true;
                                    })
                                })
                                .flatten()
                                .value();
        }

        // Exclude release levels if versionSwitcher.excludeLevel
        switch (excludeLevel) {
            case 'patch':
                selectedVersions = _.chain(selectedVersions)
                                    .map(function(version){
                                        return semverTruncate(version, 'minor');
                                    })
                                    .value();
                break;
            case 'minor':
                selectedVersions = _.chain(selectedVersions)
                                    .map(function(version){
                                        return semverTruncate(version, 'major');
                                    })
                                    .value();
                break;
            default:
                selectedVersions = _.chain(selectedVersions)
                                    .map(function(version){
                                        return semverTruncate(version, 'patch');
                                    })
                                    .value();
                break;
        }

        versionSwitcherData.versions = _.chain(selectedVersions)
                                        .uniq()
                                        .sort(function(a, b) {
                                            if (a < b) {
                                                return -1;
                                            }
                                            return 1;
                                        })
                                        .reverse()
                                        .value();

        // Generate {outputDir}/versionSwitcher/data.js
        fs.writeFileSync(path.normalize(versionSwitcherOutputDir + '/data.js'), 'var data = ' + JSON.stringify(versionSwitcherData) + ';');
    });

};
