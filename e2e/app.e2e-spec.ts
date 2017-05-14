import { MyKindOfWeatherPage } from './app.po';

describe('my-kind-of-weather App', function() {
  let page: MyKindOfWeatherPage;

  beforeEach(() => {
    page = new MyKindOfWeatherPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
