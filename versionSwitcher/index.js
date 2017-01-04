'use strict';

var fs = require('jsdoc/fs');
var path = require('jsdoc/path');
var Promise = require('bluebird');
var gitSemverTags = Promise.promisify(require('git-semver-tags'));

/**
 * [exports description]
 * @param  {String} outputDir      Path to the output folder for the generated documentation
 * @param  {String} currentVersion Current version from package.json
 * @param  {String} pageTitle      Used as content of the <title> element of the page
 */
module.exports = function (outputDir, currentVersion, pageTitle) {
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

    // Git versions from Git tags and generate {outputDir}/versionSwitcher/data.js
    gitSemverTags().then(function(versions){
        versionSwitcherData.versions = versions;
        fs.writeFileSync(path.normalize(versionSwitcherOutputDir + '/data.js'), 'var data = ' + JSON.stringify(versionSwitcherData) + ';');
    });

};
