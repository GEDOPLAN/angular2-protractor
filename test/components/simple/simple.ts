/// <reference path="..\..\..\typings\main.d.ts" />

describe('Home-Page', () => {
    beforeEach(() => browser.get('http://localhost:3000/home'))

    it('Navigation Rendered', () =>
        expect(element(by.id('toForm')).getText()).toBe("Formular-Tests")
    );
});

