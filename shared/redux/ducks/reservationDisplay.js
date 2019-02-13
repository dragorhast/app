import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { apiReservationCancel, apiReservationsFetch } from '../../api/tap2go';

// Prop Types
const ReservationDisplaySingle = {
  reservationId: PropTypes.number,
  pickupId: PropTypes.number,
  pickupName: PropTypes.string,
  pickupLocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  datetime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

// Each entry in the list is the same as one single
export const ReservationDisplayPropTypes = {
  list: PropTypes.shape({
    ...ReservationDisplaySingle,
  }),
  ...ReservationDisplaySingle,
};

// Actions
const RESERVATION_DISPLAY_SET_SINGLE = 'RESERVATION_DISPLAY_SET_SINGLE';
const RESERVATION_DISPLAY_SET_FIELD = 'RESERVATION_DISPLAY_SET_FIELD';
const RESERVATION_DISPLAY_CLEAR_SINGLE = 'RESERVATION_DISPLAY_CLEAR_SINGLE';
const RESERVATION_DISPLAY_SET_LIST = 'RESERVATION_DISPLAY_SET_LIST';

// Initial State
const INITIAL_STATE = {
  list: [],
  reservationId: null,
  pickupId: null,
  pickupName: null,
  pickupLocation: null,
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
        pickupLocation: payload.pickupLocation,
        datetime: payload.datetime,
      };
    case RESERVATION_DISPLAY_SET_FIELD:
      return {
        ...state,
        [payload.field]: payload.value,
      };
    case RESERVATION_DISPLAY_SET_LIST:
      return {
        ...state,
        list: payload,
      };
    case RESERVATION_DISPLAY_CLEAR_SINGLE:
      return INITIAL_STATE;
    default:
      return state;
  }
}
// Action Creators
export const setSingleReservationDisplay = ({ reservationId, pickupId, pickupName, pickupLocation, datetime }) => ({
  type: RESERVATION_DISPLAY_SET_SINGLE,
  payload: {
    reservationId,
    pickupId,
    pickupName,
    pickupLocation,
    datetime,
  },
});

export const setReservationsList = reservationList => ({
  type: RESERVATION_DISPLAY_SET_LIST,
  payload: reservationList,
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

const clearReservationSingle = () => ({
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

/**
 * Fetches all reservations made by a user that are in the future
 * and waiting to be claimed or cancelled
 *
 * @returns {Function}
 */
export const reservationsFetchUsers = () => async dispatch => {
  try {
    dispatch(setStatus('loading'));
    const authToken = await Firebase.auth().currentUser.getIdToken();

    const reservations = await apiReservationsFetch(authToken);
    dispatch(
      setReservationsList(
        // gets each reservation in to a form that will be useful for single display
        reservations.map(reservation => ({
          reservationId: reservation.id,
          datetime: reservation.reserved_for,
          pickupName: reservation.pickup.properties.name,
          pickupId: reservation.pickup.properties.id,
          pickupLocation: reservation.pickup.properties.center,
        }))
      )
    );
    // Doesn't not need success message as will distract from what's happening
    dispatch('loading', false);
  } catch (e) {
    dispatch(setStatus('error', 'Unable to get current reservations'));
    throw e;
  }
};
