import { B2BPortalPage } from './app.po';

describe('b2-bportal App', function() {
  let page: B2BPortalPage;

  beforeEach(() => {
    page = new B2BPortalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ascib works!');
  });
});
