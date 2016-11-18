$(function () {

    var $versionSwitcher = $('#selectVersion');
    var options = [];

    $.each(data.versions, function(index, version) {
        // Get rid of semver version prefixes
        version = version.replace('v', '');

        options.push('<option value="' + version + '">v' + version +'</option>');
    });

    $versionSwitcher.html(options);

    $versionSwitcher.on('change', function (e) {
        $('#docs').attr('src', './' + e.target.value);
    });

});
