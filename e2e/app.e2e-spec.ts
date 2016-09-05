import { Angular2DatepickerPage } from './app.po';

describe('angular2-datepicker App', function() {
  let page: Angular2DatepickerPage;

  beforeEach(() => {
    page = new Angular2DatepickerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
