import { browser, element, by } from 'protractor';

export class B2BPortalPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ascib-root h1')).getText();
  }
}
