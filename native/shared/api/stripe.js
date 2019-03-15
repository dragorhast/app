/**
 * Files for connecting native app to stripe
 *
 * NOT NEEDED ON WEB
 */

import Stripe from 'react-native-stripe-api';

const publicApiKey = 'pk_test_5hGiK9jOHv1FiDwfxxMpUBcR';
const client = new Stripe(publicApiKey);

/**
 * Creates stripe token with card details
 *
 * @param card details
 * @returns Promise<Token>
 */
// eslint-disable-next-line camelcase
export const stripeGetToken = ({ number, exp_month, exp_year, cvc }) =>
  client.createToken({ number, exp_month, exp_year, cvc });
