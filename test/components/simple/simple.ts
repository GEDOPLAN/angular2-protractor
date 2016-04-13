/// <reference path="..\..\..\typings\main.d.ts" />

describe('Home-Page', () => {
    beforeEach((done) => browser.get('http://localhost:3000/home').then(() => done()));

    it('Navigation Rendered', () =>
        expect(element(by.id('toForm')).getText()).toBe("Formular-Tests")
    );
});

