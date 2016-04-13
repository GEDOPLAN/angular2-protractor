/// <reference path="..\..\..\typings\main.d.ts" />

describe('Home-Page', function() {
    beforeEach(function() {
        browser.get('http://localhost:3000/');
    })

    it('Navigation Rendered', function() {
        element.all(by.css('button[class*=btn-primary]')).then(function(elements) {
            expect(elements.length).toBe(2);
        });

        element.all(by.css('.nav li>a')).then(function(elements) {
            expect(elements.length).toBe(3);
        })
    });


    it("Navigate Services", function() {
        element.all(by.css("button[class*=btn-primary]")).get(1).click().then(function() {
            browser.getCurrentUrl().then(function(u) {
                expect(u).toMatch(".*?/service");
            })
        })
    })

    it("Navigate Forms", function() {
        element.all(by.css("button[class*=btn-primary]")).get(0).click().then(function() {
            browser.getCurrentUrl().then(function(u) {
                expect(u).toMatch(".*?/form");
            })
        })
    })
});



