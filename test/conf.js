var HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

var reporter = new HtmlScreenshotReporter({
    dest: 'test/result',
    filename: 'report.html'
});

exports.config = {
    framework: 'jasmine',
    seleniumServerJar: '../node_modules/protractor/selenium/selenium-server-standalone-2.52.0.jar',
    useAllAngular2AppRoots: true,
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['incognito', 'disable-extensions', 'start-maximized']
        }
    },

    beforeLaunch: function () {
        return new Promise(function (resolve) {
            reporter.beforeLaunch(resolve);
        });
    },

    onPrepare: function () {
        jasmine.getEnv().addReporter(reporter);
    },

    afterLaunch: function (exitCode) {
        return new Promise(function (resolve) {
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    }
};