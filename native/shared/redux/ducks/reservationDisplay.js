import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import {
  apiReservationCancel,
  apiReservationsUserFetch,
  apiReservationsAdminFetch,
  apiPickupFetchSingle,
} from '../../api/tap2go';

// Prop Types
export const ReservationDisplaySingleProps = {
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
  list: PropTypes.arrayOf(
    PropTypes.shape({
      ...ReservationDisplaySingleProps,
    })
  ),
  ...ReservationDisplaySingleProps,
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
// const setFieldReservation = keyValuePair => ({
//   type: RESERVATION_DISPLAY_SET_FIELD,
//   payload: {
//     field: Object.keys(keyValuePair)[0],
//     value: keyValuePair[Object.keys(keyValuePair)[0]],
//   },
// });

// const clearReservationSingle = () => ({
//   type: RESERVATION_DISPLAY_CLEAR_SINGLE,
// });

// Thunks
export const reservationCancel = reservationId => async (dispatch, getState) => {
  try {
    dispatch(setStatus('loading'));
    const authToken = await Firebase.auth().currentUser.getIdToken();

    await apiReservationCancel(authToken, reservationId || getState().reserveDisplay.reservationId);

    dispatch(setStatus('success', 'Reservation cancelled'));
  } catch (e) {
    console.log(e);
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
export const reservationsFetch = (admin = false) => async dispatch => {
  try {
    const authToken = await Firebase.auth().currentUser.getIdToken();
    let reservations;
    if (admin) {
      reservations = await apiReservationsAdminFetch(authToken);
    } else {
      reservations = await apiReservationsUserFetch(authToken);
    }

    // Hack around the fact api doesn't return pickup point on each reservation
    const reservationWithPickup = await getPickupForEachReservation(authToken, reservations);

    // Gets in to a state the store can understand
    const reservationList = reservationWithPickup.map(reservation => ({
      reservationId: reservation.id, // TODO remove
      datetime: reservation.reserved_for,
      pickupName: reservation.pickup.properties.name,
      pickupId: reservation.pickup_id,
      pickupLocation: reservation.pickup.properties.center,
    }));
    return dispatch(setReservationsList(reservationList));
  } catch (e) {
    console.log(e.message);
    // TODO handle differently on the api
    if (e.message === 'Could not find reservation with the given params.' || e.message.includes('404')) {
      dispatch(setReservationsList([]));
      return Promise.resolve(); // not an error
    }
    dispatch(setStatus('error', 'Unable to get current reservations'));
    throw e;
  }
};

/**
 * Calls the api to fetch the pickup for reach reservation
 * @param authToken
 * @param reservations - array of reservations without pickup
 * @returns {Promise<any[]>}
 */
const getPickupForEachReservation = async (authToken, reservations) => {
  const promises = reservations.map(async res => ({
    ...res,
    pickup: await apiPickupFetchSingle(authToken, res.pickup_id),
  }));

  return Promise.all(promises);
};
