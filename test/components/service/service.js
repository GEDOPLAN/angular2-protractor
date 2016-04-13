describe("Service-Page", function () {
    beforeEach(function (done) {
        browser.get('http://localhost:3000/service').then(done);
    })

    it("Loaded Correctly Post 1", function () {
        expect(element(by.xpath('//span[contains(.,"userId")]/../../div[2]')).getText()).toBe("1")
    })
})
