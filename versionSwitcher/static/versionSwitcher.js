$(function () {

    var $versionSwitcher = $('#selectVersion');
    var options = [];
    var $iFrame = $('#docs');

    $('title').html(data.pageTitle);

    $iFrame.attr('src', './' + data.currentVersion);

    $.each(data.versions, function(index, version) {
        // Get rid of semver version prefixes
        version = version.replace('v', '');

        options.push('<option value="' + version + '">v' + version +'</option>');
    });
    $versionSwitcher.html(options);

    $versionSwitcher.on('change', function (e) {
        $iFrame.attr('src', './' + e.target.value);
    });

});
