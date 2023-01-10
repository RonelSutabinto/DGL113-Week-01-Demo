import exp from 'constants';
import path from 'path';

describe('index.html', () => {
  const dialogHandler2 = jest.fn(dialog => dialog.dismiss());

  beforeAll(async () => {
    const URL = `file:///${path.resolve(__dirname, '../docs/index.html')}`;
    page.on('dialog', dialogHandler2);
    await page.goto(URL, {
      waitUntil: 'networkidle2'
    });
  });

  it('proPrice == 99', async () => {
    const proPrice = await page.evaluate('proPrice');
    expect(proPrice).toEqual(99);
  });

  it('proPrice card 99', async () => {
    await page.waitForSelector('#propriceh1');
    const element = await page.$('#propriceh1');
    const value = await page.evaluate(el => el.textContent, element);
    expect(value).toMatch(/^\$.*[^0-9\.]99\/mo$/);
  });

  it('enterprisePrice == 198', async () => {
    const enterprisePrice = await page.evaluate('enterprisePrice');
    expect(enterprisePrice).toEqual(198);
  });

  it('enterprisePrice card 198', async () => {
    await page.waitForSelector('#enterprisepriceh1');
    const element = await page.$('#enterprisepriceh1');
    const value = await page.evaluate(el => el.textContent, element);
    expect(value).toMatch(/^\$.*[^0-9\.]198\/mo$/);
  });

  it('should display a dialog', () => {
    expect(dialogHandler2).toHaveBeenCalled();
  });

  it('should have message "Check out our amazing prices!"', () => {
    const [firstCall] = dialogHandler2.mock.calls;
    const [dialog] = firstCall;
    expect(dialog.message()).toEqual('Check out our amazing prices!');
  });
});
