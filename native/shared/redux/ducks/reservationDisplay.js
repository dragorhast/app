import _ from 'lodash';
import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import {
  apiReservationCancel,
  apiReservationsUserFetch,
  apiReservationsAdminFetch,
  apiReservationSingleFetch,
} from '../../api/tap2go';

// Prop Types
export const ReservationDisplaySingleProps = {
  reservationId: PropTypes.number,
  pickupId: PropTypes.number,
  pickupName: PropTypes.string,
  pickupLocation: PropTypes.arrayOf(PropTypes.number),
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
const RESERVATION_DISPLAY_FILTERS_SET = 'RESERVATION_DISPLAY_FILTERS_SET';

// Initial State
const INITIAL_STATE = {
  pickupNameFilter: 'asc',
  timeFilter: 'asc',
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
    case RESERVATION_DISPLAY_FILTERS_SET:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}
// Action Creators
export const setReservationNameOrderAsc = boolean => ({
  type: RESERVATION_DISPLAY_FILTERS_SET,
  payload: {
    pickupNameFilter: boolean ? 'asc' : 'desc',
  },
});

export const setReservationTimeOrderAsc = boolean => ({
  type: RESERVATION_DISPLAY_FILTERS_SET,
  payload: {
    timeFilter: boolean ? 'asc' : 'desc',
  },
});

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
 * Fetches reservations
 * Either:
 * - Admin - fetch all
 * - User - all made by user that are in the future
 *
 * @returns {Function}
 */
export const reservationsFetch = (admin = false) => async dispatch => {
  try {
    const authToken = await Firebase.auth().currentUser.getIdToken();
    let reservationsRaw;
    if (admin) {
      reservationsRaw = await apiReservationsAdminFetch(authToken);
    } else {
      reservationsRaw = await apiReservationsUserFetch(authToken);
    }

    // Gets in to a state the store can understand
    const reservations = getRawReservationsDataReady(reservationsRaw);

    return dispatch(setReservationsList(reservations));
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
 * Fetches a single reservation based on id
 * @returns {Function}
 */
export const reservationSingleFetch = reservationId => async dispatch => {
  try {
    const authToken = await Firebase.auth().currentUser.getIdToken();
    const res = await apiReservationSingleFetch(authToken, reservationId);
    await dispatch(
      setSingleReservationDisplay({
        reservationId: res.id,
        pickupId: res.pickup_id,
        pickupName: res.pickup.properties.id,
        pickupLocation: res.pickup.properties.center,
        datetime: res.reserved_for,
      })
    );
  } catch (e) {
    console.log(e);
    dispatch(setStatus('error', `Unable to get reservation ${reservationId} from the API`));
  }
};

// Selectors
export const getReservationsWithFilter = (reservations, pickupNameFilter, timeFilter) =>
  _.orderBy(reservations, ['pickupName', 'datetime'], [pickupNameFilter, timeFilter]);

// ****** Helper Function ****** //
/**
 * Ensures same format is used for pickups list + reservations list
 *
 * @param reservationsRaw
 * @returns {*}
 */
export const getRawReservationsDataReady = reservationsRaw =>
  reservationsRaw.map(reservation => ({
    reservationId: reservation.id, // TODO remove
    datetime: reservation.reserved_for,
    pickupName: reservation.pickup.properties.name,
    pickupId: reservation.pickup_id,
    pickupLocation: reservation.pickup.properties.center,
  }));
