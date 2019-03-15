import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { getRawBikeDataReady, setBikes } from './bikes';
import { getRawReservationsDataReady } from './reservationDisplay';
import { pickupStateFromBikeCount } from '../../util';
import { apiPickupFetchSingle, apiPickupFetchBikes, apiPickupFetchReservations } from '../../api/tap2go';
// Actions
const PICKUP_SINGLE_SET = 'PICKUP_SINGLE_SET';
const PICKUP_BIKES_SET = 'PICKUP_BIKES_SET';
const PICKUP_RESERVATIONS_SET = 'PICKUP_RESERVATIONS_SET';

// Initial State
const INITIAL_STATE = {
  pickup: {
    pickupId: '',
    name: '',
    coordinates: null,
    distance: null,
    status: '',
  },
  bikes: [],
  reservations: [],
};

// Prop Types
export const PickupPropTypes = {
  pickupId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  distance: PropTypes.number,
  status: PropTypes.string,
};

// Reducer
export default function pickupSingleReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case PICKUP_SINGLE_SET:
      return {
        ...state,
        pickup: { ...payload },
      };
    case PICKUP_BIKES_SET:
      return {
        ...state,
        bikes: payload,
      };
    case PICKUP_RESERVATIONS_SET:
      return {
        ...state,
        reservations: payload,
      };
    default:
      return state;
  }
}
// Action Creators
export const setPickup = ({ pickupId, name, coordinates, distance, status }) => ({
  type: PICKUP_SINGLE_SET,
  payload: {
    pickupId,
    name,
    coordinates,
    distance,
    status,
  },
});

const setPickupReservations = reservations => ({
  type: PICKUP_RESERVATIONS_SET,
  payload: reservations,
});

// Thunks
export const pickupSingleFetch = pickupId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const pickup = await apiPickupFetchSingle(authToken, pickupId);
    const coordinates = [];
    console.log('coordinates: ', pickup.geometry.coordinates);
    pickup.geometry.coordinates[0].forEach(([x, y]) => {
      pickup.coordinates.push({ lat: x, long: y });
    });

    await dispatch(
      setPickup({
        pickupId: pickup.properties.id,
        name: pickup.properties.name,
        coordinates,
        distance: pickup.properties.distance,
        status: pickupStateFromBikeCount(pickup.properties.bikes || []),
      })
    );
    return dispatch(setStatus('loading', false));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

/**
 * Gets all the bieks at a pickup point and
 * set the state with them
 *
 * @param pickupId
 * @returns {Function}
 */
export const pickupBikesFetch = pickupId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const bikes = await apiPickupFetchBikes(authToken, pickupId);

    await dispatch(setBikes(getRawBikeDataReady(bikes), PICKUP_BIKES_SET));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    console.log('Pickup point bikes failed ', e.message);
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

/**
 * Gets all the reservations associated with a pickup point and
 * sets them in the state
 *
 * @param pickupId
 * @returns {Function}
 */
export const pickupReservationsFetch = pickupId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));
    const authToken = await Firebase.auth().currentUser.getIdToken();
    const reservationsRaw = await apiPickupFetchReservations(authToken, pickupId);

    await dispatch(setPickupReservations(getRawReservationsDataReady(reservationsRaw)));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    console.log('Pickup point reservations failed ', e.message);
    dispatch(setStatus('error', e.message));
    throw e;
  }
};
