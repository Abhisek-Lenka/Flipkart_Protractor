/**
 * @description: Page objects of the flipkart page
 */

'use strict';

var flipkartGamingLaptop = function () {

    this.loginForm = element(by.css('._32LSmx'));
    this.loginFormCancelButton = element(by.css('button._2AkmmA._29YdH8'));
    this.electronicsTab = element(by.xpath('//*[@class="Wbt_B2 _1YVU3_"]//*[contains(text(),"Electronics")]'));
    this.gamingLaptop = element(by.css('a[title="Gaming Laptops"]'));
    this.selectedMenuHeader = element(by.css('._30P0WS'));
    this.asusGamingLaptopsTab = element(by.xpath('//*[@class="Ul-VjD"][contains(text(),"Asus Gaming Laptops")]'));
    this.asusProductItems = element.all(by.css('[data-tracking-id="Asus Gaming Laptops"] ._2cLu-l'));
    this.productPreview = element(by.css('._2rDnao'));
    this.productNameInPreviewPage = element(by.css('._35KyD6'));
    this.compareButton = element(by.css('._1O_CiZ._1V9Q4D'));
    this.compareProductButton = element(by.css('._1h5zc_'));
    this.compareTab = element(by.css('._1SVp3c'));
    this.productNamesInCompareTab = element.all(by.css('._3YNWH1'));
    this.productPreviewInCompareTab = element.all(by.css('.QySJvb'));
    this.removeProductInCompareTab = element(by.css('[title="Remove Product"]'));
    this.temporaryUnavailableBanner = element(by.xpath('//*[contains(@class,"_1SVp3c")]//*[@class="_1GJ2ZM"][contains(text(),"Temporarily Unavailable")]'));
    this.chooseBrand = element.all(by.xpath('//*[contains(@class,"_3092M2 LykW5d")][contains(text(),"Choose Brand")]'));
    this.chooseProduct = element.all(by.xpath('//*[contains(@class,"_3092M2 LykW5d")][contains(text(),"Choose a Product")]'));
    this.brandListItems = element.all(by.xpath('(//*[contains(@class,"_3092M2 LykW5d")][contains(text(),"Choose Brand")])[1]/..//*[@class="_2KISpu"]'));
    this.productListItems = element.all(by.xpath('(//*[contains(@class,"_3092M2 LykW5d")][contains(text(),"Choose a Product")])[1]/..//*[@class="_2KISpu"]'));
    this.product1Rating = element(by.xpath('((//*[@class="_3bNYmG"]//*[@class="row _1i6HY7"])[2]//*[@class="FBcwj-"])[1]//*[@class="hGSR34"]'));
    this.product2Rating = element(by.xpath('((//*[@class="_3bNYmG"]//*[@class="row _1i6HY7"])[2]//*[@class="FBcwj-"])[2]//*[@class="hGSR34"]'));

};

module.exports = flipkartGamingLaptop;