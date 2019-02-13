import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { apiReservationCancel } from '../../api/tap2go';

// Prop Types
export const ReservationDisplayPropTypes = {
  reservationId: PropTypes.number,
  pickupId: PropTypes.number,
  pickupName: PropTypes.string,
  datetime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

// Actions
const RESERVATION_DISPLAY_SET_SINGLE = 'RESERVATION_DISPLAY_SET_SINGLE';
const RESERVATION_DISPLAY_SET_FIELD = 'RESERVATION_DISPLAY_SET_FIELD';
const RESERVATION_DISPLAY_CLEAR_SINGLE = 'RESERVATION_DISPLAY_CLEAR_SINGLE';

// Initial State
const INITIAL_STATE = {
  list: [],
  reservationId: null,
  pickupId: null,
  pickupName: null,
  datetime: null,
};
// Reducer
export default function reservationDisplayReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case RESERVATION_DISPLAY_SET_SINGLE:
      return {
        ...state,
        reservationId: payload.reservationId,
        pickupId: payload.pickupId,
        pickupName: payload.pickupName,
        datetime: payload.datetime,
      };
    case RESERVATION_DISPLAY_SET_FIELD:
      return {
        ...state,
        [payload.field]: payload.value,
      };
    case RESERVATION_DISPLAY_CLEAR_SINGLE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
// Action Creators
export const setSingleReservationDisplay = ({ reservationId, pickupId, pickupName, datetime }) => ({
  type: RESERVATION_DISPLAY_SET_SINGLE,
  payload: {
    reservationId,
    pickupId,
    pickupName,
    datetime,
  },
});

/**
 * Sets a single field for displaying a single reservation using
 * a key value pair that aligns with which field to change and the
 * value to set it to
 *
 * @param keyValuePair
 * @returns {{payload: {field: string, value: *}, type: string}}
 */
const setFieldReservation = keyValuePair => ({
  type: RESERVATION_DISPLAY_SET_FIELD,
  payload: {
    field: Object.keys(keyValuePair)[0],
    value: keyValuePair[Object.keys(keyValuePair)[0]],
  },
});

const clearReservations = () => ({
  type: RESERVATION_DISPLAY_CLEAR_SINGLE,
});

// Thunks
export const reservationCancel = reservationId => async (dispatch, getState) => {
  try {
    dispatch(setStatus('loading'));
    const authToken = await Firebase.auth().currentUser.getIdToken();

    await apiReservationCancel(authToken, reservationId || getState.reserveDisplay.reservationId);

    dispatch('success', 'Reservation cancelled');
  } catch (e) {
    console.error(e);
    dispatch(setStatus('error', 'Unable to cancel reservations'));
    throw e;
  }
};
