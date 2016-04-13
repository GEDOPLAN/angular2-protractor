/// <reference path="..\..\..\typings\main.d.ts" />

 describe("Service-Page", function () {
    beforeEach(function () {
        browser.get('http://localhost:3000/service');
    })

    it("Loaded Correctly Post 1", function () {
        expect(element(by.xpath('//span[contains(.,"userId")]/../../div[2]')).getText()).toBe("1")
    })
})


