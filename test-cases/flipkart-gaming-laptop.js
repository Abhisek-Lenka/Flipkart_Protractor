/**
 * Automation the flipkart gaming laptop scenario
 */
'use strict';

describe('Choose the best gaming laptop after comparison', function () {

    const fkLocators = new (require('../page-objects/flipkart-gaming.js'));
    const tu = new (require('../test-util.js'));
    const tc = new (require('../test-constants.js'));
    const EC = protractor.ExpectedConditions;
    let productName;

    /**
     * This function compares the products and prints the better product among two
     * @param {Integer} count : Sl no of the brand
     * @param {Integer} max : Total no of brands in the list
     */
    let selectAvailableProductToCompare = function (count, max) {

        if (count < max) {

            browser.wait(EC.elementToBeClickable(fkLocators.brandListItems.get(count)), 5000);
            fkLocators.brandListItems.get(count).click();

            browser.sleep(2000);

            browser.wait(EC.elementToBeClickable(fkLocators.chooseProduct.get(0)), 5000);

            fkLocators.chooseProduct.get(0).click();

            browser.sleep(2000);

            fkLocators.productListItems.count().then(function (totalProducts) {

                if (totalProducts > 1) {
                    moreThanOneProductInList(0, totalProducts, count);
                }
                else {

                    fkLocators.productListItems.get(0).click();

                    //wait for the second product's preview
                    browser.wait(function () {
                        return tu.isElementDisplayed(fkLocators.productPreviewInCompareTab.get(1));
                    }, 15000);

                    browser.sleep(1000);

                    tu.isElementDisplayed(fkLocators.temporaryUnavailableBanner).then(function (isDisp) {

                        if (isDisp) {

                            fkLocators.productPreviewInCompareTab.get(1).element(by.xpath('..')).element(fkLocators.removeProductInCompareTab.locator()).click();

                            expect(fkLocators.productPreviewInCompareTab.count()).toBe(1);

                            browser.wait(EC.visibilityOf(fkLocators.chooseBrand.get(0)), 5000);

                            //choose another product to compare
                            fkLocators.chooseBrand.get(0).click();

                            selectAvailableProductToCompare(count + 1, max);
                        }
                        else {
                            return compareAndFindBestProduct();
                        }
                    });
                }
            });
        }
    };

    /**
     * This function is used if there are more no of products under a brand
     * @param {Integer} productNo : The sl no of the products in the list
     * @param {Integer} totalProducts : Total no of products present under the brand
     * @param {Integer} brand : Sl no of the selected brand
     */
    let moreThanOneProductInList = function (productNo, totalProducts, brand) {

        if (productNo < totalProducts) {

            fkLocators.productListItems.get(productNo).click();

            //wait for the second product's preview
            browser.wait(function () {
                return tu.isElementDisplayed(fkLocators.productPreviewInCompareTab.get(1));
            }, 15000);

            tu.isElementDisplayed(fkLocators.temporaryUnavailableBanner).then(function (isDisp) {

                if (isDisp) {

                    //remove the product
                    fkLocators.productPreviewInCompareTab.get(1).element(by.xpath('..')).element(fkLocators.removeProductInCompareTab.locator()).click();

                    expect(fkLocators.productPreviewInCompareTab.count()).toBe(1);

                    browser.wait(EC.visibilityOf(fkLocators.chooseBrand.get(0)), 5000);

                    //choose another product to compare
                    fkLocators.chooseBrand.get(0).click();

                    browser.wait(EC.visibilityOf(fkLocators.brandListItems.get(0)), 5000);

                    fkLocators.brandListItems.get(brand).click();

                    browser.wait(EC.visibilityOf(fkLocators.chooseProduct.get(0)), 5000);
                    browser.wait(EC.elementToBeClickable(fkLocators.chooseProduct.get(0)), 5000);

                    fkLocators.chooseProduct.get(0).click();

                    browser.wait(EC.visibilityOf(fkLocators.productListItems.get(0)), 5000);

                    moreThanOneProductInList(productNo + 1, totalProducts, brand);
                }
                else {
                    return compareAndFindBestProduct();
                }
            });
        } else {
            fkLocators.brandListItems.count().then(function (count) {
                return selectAvailableProductToCompare(brand + 1, count);
            });
        }
    };

    /**
     * This function compares and prints the better product
     */
    let compareAndFindBestProduct = function () {

        tu.isElementDisplayed(fkLocators.product1Rating).then(function (rating1) {
            tu.isElementDisplayed(fkLocators.product2Rating).then(function (rating2) {

                if (!rating1 && rating2) {
                    fkLocators.compareTab.element(fkLocators.productNamesInCompareTab.get(1).locator()).getText().then(function (name) {
                        console.log('As the first product does not have rating. The suitable product is : ' + name);
                    });
                }
                else if (!rating2 && rating1) {
                    console.log('As the second product does not have rating. The suitable product is : ' + productName);
                }
                else if (rating1 && rating2) {
                    fkLocators.product1Rating.getText().then(function (productRating1) {
                        fkLocators.product2Rating.getText().then(function (productRating2) {
                            if (parseFloat(productRating1) > parseFloat(productRating2)) {
                                console.log('The suitable product is : ' + productName);
                            }
                            else if (parseFloat(productRating1) === parseFloat(productRating2)) {
                                console.log('Both have same ratings. So suitable product should be the latest product : ' + productName);
                            }
                            else {
                                fkLocators.compareTab.element(fkLocators.productNamesInCompareTab.get(1).locator()).getText().then(function (name) {
                                    console.log('The suitable product is : ' + name);
                                });
                            }
                        });
                    });
                }
                else if (!rating1 && !rating2) {
                    console.log('There are no ratings in either of the products. So suitable product should be the latest product : ' + productName);
                }
                else {
                    console.log('Exception case!!!');
                }
            });
        });
    };

    beforeEach(function () {

        //set this to true as this is not an angular website
        browser.ignoreSynchronization = true;

        //visit the flipkart website
        browser.get(tc.flipkartUrl);
    });

    it('Should select laptops, compare them and choose the best one', function () {

        browser.ignoreSynchronization = true;

        //wait for the gaming laptop menu to appear, cancel the login form
        browser.wait(function () {
            return tu.isElementDisplayed(fkLocators.loginForm);
        }, 10000);

        fkLocators.loginFormCancelButton.click();

        browser.wait(EC.invisibilityOf(fkLocators.loginForm), 5000);

        //assert that the electronics menu is shown and move to the electronics tab
        expect(tu.isElementDisplayed(fkLocators.electronicsTab)).toBe(true);
        browser.actions().mouseMove(fkLocators.electronicsTab).perform();

        //wait for the gaming laptop menu to appear
        browser.wait(function () {
            return tu.isElementDisplayed(fkLocators.gamingLaptop);
        }, 5000);

        fkLocators.gamingLaptop.click();

        //wait for the gmaing laptop page to load
        browser.wait(function () {
            return tu.isElementDisplayed(fkLocators.selectedMenuHeader);
        }, 15000);

        expect(fkLocators.selectedMenuHeader.getText()).toBe('Gaming Laptops');

        // scroll to the asus gaming laptops tab
        tu.scrollIntoView(fkLocators.asusGamingLaptopsTab);

        browser.sleep(1000);

        //get the product name
        fkLocators.asusProductItems.get(0).getAttribute('title').then(function (productname) {
            productName = productname;
        });

        //click on the first asus product
        fkLocators.asusProductItems.get(0).click();

        //switch to second tab
        browser.getAllWindowHandles().then(function (winHandles) {

            if (winHandles.length >= 2) {
                browser.switchTo().window(winHandles[1]).then(function () {

                    //wait for the preview to load
                    browser.wait(function () {
                        return tu.isElementDisplayed(fkLocators.productPreview);
                    }, 15000);

                    //assert the product name
                    expect(fkLocators.productNameInPreviewPage.getText()).toContain(productName);

                    //assert the compare button is visible and click it
                    expect(tu.isElementDisplayed(fkLocators.compareButton)).toBe(true);
                    fkLocators.compareButton.click();

                    //wait for the compare product button to appear
                    browser.wait(function () {
                        return tu.isElementDisplayed(fkLocators.compareProductButton);
                    }, 15000);

                    fkLocators.compareProductButton.click();

                    //wait for the compare product tab to appear
                    browser.wait(function () {
                        return tu.isElementDisplayed(fkLocators.compareTab);
                    }, 15000);

                    //assert the name of the product in compare tab
                    expect(fkLocators.compareTab.element(fkLocators.productNamesInCompareTab.get(0).locator()).getText()).toBe(productName);

                    //assert the preview of the product is shown in compare tab
                    expect(tu.isElementDisplayed(fkLocators.productPreviewInCompareTab.get(0))).toBe(true);

                    //wait for the compare product tab to appear
                    browser.wait(function () {
                        return tu.isElementDisplayed(fkLocators.chooseBrand.get(0));
                    }, 15000);

                    //choose another product to compare
                    fkLocators.chooseBrand.get(0).click();

                    fkLocators.brandListItems.count().then(function (count) {
                        selectAvailableProductToCompare(0, count);
                    });
                });
            }
        });
    });
});