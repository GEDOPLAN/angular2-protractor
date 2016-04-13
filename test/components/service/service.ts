/// <reference path="..\..\..\typings\main.d.ts" />
 
describe("Service-Page", () => {
    beforeEach( (done) => browser.get('http://localhost:3000/service').then(() => done()));

    it("Loaded Correctly Post 1", () => {
        expect(element(by.xpath('//span[contains(.,"userId")]/../../div[2]')).getText()).toBe("1")
    })
})


