import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { apiUserFetchPaymentDetails, apiUserSetPaymentDetails } from '../../api/tap2go';
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
 * Replaces the entire state with a set card
 *
 * @param name
 * @param cardNumber
 * @param month
 * @param year
 * @returns {{payload: {cvc: *, month: *, year: *, methodName: *, cardNumber: *}, type: string}}
 */
const setPayment = ({ cardNumber, month, year }) => ({
  type: PAYMENT_SET,
  payload: {
    cardNumber,
    month,
    year,
  },
});

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
/**
 * Fetches the user's card details for filling in form
 *
 * @returns {Function}
 */
export const paymentFetchDetails = () => async dispatch => {
  try {
    dispatch(setStatus('loading'));
    const authToken = await Firebase.auth().currentUser.getIdToken();
    const paymentDetails = await apiUserFetchPaymentDetails(authToken);
    dispatch(
      setPayment({
        cardNumber: paymentDetails.card_number,
        month: paymentDetails.month,
        year: paymentDetails.year,
      })
    );
    // TODO figure out if this re-routes
    return dispatch(setStatus('loading', false));
  } catch (e) {
    dispatch(setStatus('error', e.message));
  }
};

// TODO decide if getState or passing as an argument is better
export const paymentSetDetails = ({ cardNumber, month, year, cvc }) => async dispatch => {
  try {
    dispatch(setStatus('loading'));
    const authToken = await Firebase.auth().currentUser.getIdToken();
    await apiUserSetPaymentDetails(authToken, { cardNumber, month, year, cvc });
    dispatch(setStatus('success', 'Successfully updated payment details!'));
  } catch (e) {
    setStatus('error', e.message);
  }
};
