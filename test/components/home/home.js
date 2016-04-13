describe('Home-Page', function () {
    beforeEach(function () {
        browser.get('http://localhost:3000/home');
    })

    it('Navigation Rendered', function () {
        element.all(by.css('button[class*=btn-primary]')).then(function (elements) {
            expect(elements.length).toBe(2);
        });

        element.all(by.css('.nav li>a')).then(function (elements) {
            expect(elements.length).toBe(3);
        })
    });

    it('Simple Navigation', function () {
        var button = element(by.id('toForm'));
        button.click().then(function () {
            expect(browser.getCurrentUrl()).toMatch(".*?/form");
        })
    });

    var navs = [
        {selector: "ul.nav li>a", index: 1, label: "Formular-Testing", urlmatch: ".*?/form"},
        {selector: "ul.nav li>a", index: 2, label: "Service-Testing", urlmatch: ".*?/service"},
        {selector: "button[class*=btn-primary]", index: 1, label: "Service-Test", urlmatch: ".*?/service"},
        {selector: "button[class*=btn-primary]", index: 0, label: "Formular-Tests", urlmatch: ".*?/form"}
    ]

    navs.forEach(function (n) {
        it("Navigate to: " + n.label, function (callback) {
            expect(element.all(by.css(n.selector)).get(n.index).getText()).toBe(n.label);
            element.all(by.css(n.selector)).get(n.index).click().then(function () {
                browser.getCurrentUrl().then(function (u) {
                    expect(u).toMatch(n.urlmatch);
                    callback();
                })
            })
        })
    })
});

