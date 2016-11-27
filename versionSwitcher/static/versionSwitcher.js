(function () {
    'use strict';

    var $versionSwitcher = $('#selectVersion');
    var $iFrame = $('#docs');

    // DOM ready
    $(function () {
        init();
        registerEvents();
    });

    function registerEvents() {
        $versionSwitcher.on('change', function (e) {
            $iFrame.attr('src', './' + e.target.value);
        });
    }

    function init() {
        var options = [];
        var initialVersion = data.currentVersion;

        // Set page title
        $('title').html(data.pageTitle);

        // Set initial iFrame source
        if (location.hash) {
            initialVersion = location.hash.replace('#', '');
        }
        $iFrame.attr('src', './' + initialVersion);

        // Fill version switcher select element with options
        $.each(data.versions, function(index, version) {
            var selected = '';
            if (initialVersion === version) {
                selected = 'selected';
            }

            // Get rid of semver version prefixes
            version = version.replace('v', '');

            options.push('<option value="' + version + '" ' + selected + '>v' + version +'</option>');
        });
        $versionSwitcher.html(options);
    }

})();
