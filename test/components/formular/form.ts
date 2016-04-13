/// <reference path="..\..\..\typings\main.d.ts" />

describe('Form-Page', () => {
    beforeEach((done) => browser.get('http://localhost:3000/form').then(() => done()));

    it("Init", () => {
        expect(element(by.id("username")).getAttribute("value")).toBe("Gast");
    })

    it("Submit Disabled", () => {
        var btn = element(by.css("button[type='submit']"))
        expect(btn.getAttribute('disabled')).toBeTruthy();
        element(by.id("message")).sendKeys("HelloWorld");
        expect(btn.getAttribute('disabled')).toBeFalsy();
    })

    it("Submit", () => {
        element(by.id("message")).sendKeys("a").then(() =>  {
            element(by.css("button[type='submit']")).click().then( ()=> {
                expect(element.all(by.css('.message-entry span')).get(0).getText()).toBe("Gast")
                expect(element.all(by.css('.message-entry span')).get(1).getText()).toBe("a")
            })
        })
    })
});

