const HtmlReporter = require('protractor-beautiful-reporter');
const fs = require('fs');
const fse = require('fs-extra');


exports.config = {
    directConnect: true,

    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        browserName: 'chrome'
    },

    framework: 'jasmine2',

    //run the test file here
    specs: ['test-cases/flipkart-gaming-laptop.js'],

    beforeLaunch: function () {

        //Delete Report Folder
        const ReportPath = 'D:/Demo Project/reports';
        if (fs.existsSync(ReportPath)) {
            fse.removeSync(ReportPath);
            console.log('Reports Folder Removed');
        }
    },

    allScriptsTimeout: 3000000,

    onPrepare: function () {

        //maximizes the window 
        browser.manage().window().maximize();

        // Add a screenshot reporter and store screenshots to `/Reports/screenshots/images`:
        jasmine.getEnv().addReporter(new HtmlReporter({

            baseDirectory: 'reports',

            screenshotsSubfolder: 'screenshots',

        }).getJasmine2Reporter());

    },

    jasmineNodeOpts: {
        defaultTimeOutInterval: 180000
    }
}