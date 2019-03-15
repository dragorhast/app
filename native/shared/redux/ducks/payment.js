import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { apiUserSetPaymentDetails } from '../../api/tap2go';
import { stripeGetToken } from '../../api/stripe';
// Actions
const PAYMENT_SET = 'PAYMENT_SET';
const PAYMENT_EDIT_SECTION = 'PAYMENT_EDIT_SECTION';

// Prop Types
export const PaymentPropTypes = {
  cardNumber: PropTypes.string,
  month: PropTypes.string,
  year: PropTypes.string,
  cvc: PropTypes.string,
};

// Initial State
const INITIAL_STATE = {
  cardNumber: '',
  month: '',
  year: '',
  cvc: '',
};
// Reducer
export default function paymentReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case PAYMENT_SET:
      return {
        ...payload,
        cvc: '', // will never be returned or set
      };
    case PAYMENT_EDIT_SECTION:
      return {
        ...state,
        ...payload, // one key value pair
      };
    default:
      return state;
  }
}
// Action Creators

/**
 * Edits a single key value pair in state
 *
 * @param keyValuePair
 * @returns {{payload: {value: *, key: string}, type: string}}
 */
export const editSectionPayments = keyValuePair => ({
  type: PAYMENT_EDIT_SECTION,
  payload: keyValuePair,
});

// Thunks

export const paymentSetDetails = ({ cardNumber, month, year, cvc }) => async dispatch => {
  try {
    dispatch(setStatus('loading'));
    const authToken = await Firebase.auth().currentUser.getIdToken();
    console.log('Auth Token: ', authToken);
    const token = await stripeGetToken({
      number: cardNumber,
      exp_month: month,
      exp_year: year,
      cvc,
    });

    console.log('Stripes Customer Token: ', token);
    await apiUserSetPaymentDetails(authToken, token.id);
    dispatch(setStatus('success', 'Successfully updated payment details!'));
  } catch (e) {
    setStatus('error', e.message);
  }
};
