import XMLHttpRequest from 'xhr2';
import { stripeGetToken } from '../stripe';

// This is needed to force jest to allow Fetch, used in Stripe package
global.XMLHttpRequest = XMLHttpRequest;

describe('Stripe create token', () => {
  it('Creates token with test Visa data', async done => {
    try {
      const card = {
        number: '4000058260000005',
        exp_month: '11',
        exp_year: '20',
        cvc: '123',
      };
      await stripeGetToken(card);
      done();
    } catch (e) {
      done.fail(e);
    }
  });
});
