describe('Form-Page', function () {
    beforeEach(function (done) {
        browser.get('http://localhost:3000/form').then(done);
    })

    it("Init", function () {
        expect(element(by.id("username")).getAttribute("value")).toBe("Gast");
    })



    it("Submit Disabled", function () {
        var btn = element(by.css("button[type='submit']"))
        expect(btn.getAttribute('disabled')).toBeTruthy();
        element(by.id("message")).sendKeys("HelloWorld").then(function () {
            expect(btn.getAttribute('disabled')).toBeFalsy();
        })
    })

    it("Submit", function () {
        element(by.id("message")).sendKeys("a").then(function () {
            element(by.css("button[type='submit']")).click().then(function () {
                expect(element.all(by.css('.message-entry span')).get(0).getText()).toBe("Gast")
                expect(element.all(by.css('.message-entry span')).get(1).getText()).toBe("a")
            })
        })
    })
});

