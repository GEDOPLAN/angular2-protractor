/// <reference path="..\..\..\typings\main.d.ts" />


describe('Form-Page', function() {
    beforeEach(function() {
        browser.get('http://localhost:3000/form');
    })

    it("Init", function() {
        expect(element(by.id("username")).getAttribute("value")).toBe("Gast");
    })
    
    it("Submit Disabled", function() {
        var btn = element(by.css("button[type='submit']"))
        expect(btn.getAttribute('disabled')).toBeTruthy();
        element(by.id("message")).sendKeys("HelloWorld");
        expect(btn.getAttribute('disabled')).toBeFalsy();
    })

    it("Submit", function() {
        element(by.id("username")).clear().then(function() {
            var promise1 = element(by.id("username")).sendKeys("Test");
            var promise2 = element(by.id("message")).sendKeys("OneMessage");
            webdriver.promise.all([promise1, promise2]).then(function() {
                element(by.css("button[type='submit']")).click().then(function() {
                    expect(element.all(by.css('.message-entry span')).get(0).getText()).toBe("Test")
                    expect(element.all(by.css('.message-entry span')).get(1).getText()).toBe("OneMessage")
                })
            })

        })
    })
});

