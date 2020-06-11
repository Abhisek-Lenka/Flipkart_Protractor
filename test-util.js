/**
 * @description: This file contains all the common and important functions
 */

'use strict';

var util = function () {

    /**
      * Verifies if an element displayed on the page or not
      * @param element
      */
     this.isElementDisplayed = function (element) {
        return element.isPresent().then(function (isPresent) {
            if (isPresent) {
                return element.isDisplayed();
            }
            else {
                return isPresent;
            }
        });
    };

    /**
     * @description Function for scrolling to a specific view / element
     * @param element
     */
    this.scrollIntoView = function (element) {
        browser.executeScript('arguments[0].scrollIntoView();', element.getWebElement());
    };

};

module.exports = util;