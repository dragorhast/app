import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { getRawBikeDataReady, setBikes } from './bikes';
import { pickupStateFromBikeCount } from '../../util';
import { apiPickupFetchSingle, apiPickupFetchBikes } from '../../api/tap2go';
// Actions
const PICKUP_SINGLE_SET = 'PICKUP_SINGLE_SET';
const PICKUP_BIKES_SET = 'PICKUP_BIKES_SET';
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
};

// Prop Types
export const PickupPropTypes = {
  pickupId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }).isRequired,
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

// Thunks
export const pickupSingleFetch = pickupId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const pickup = await apiPickupFetchSingle(authToken, pickupId);

    await dispatch(
      setPickup({
        pickupId: pickup.properties.id,
        name: pickup.properties.name,
        coordinates: pickup.properties.center,
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

export const pickupBikesFetch = pickupId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const bikes = await apiPickupFetchBikes(authToken, pickupId);

    await dispatch(setBikes(getRawBikeDataReady(bikes), PICKUP_BIKES_SET));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    console.log('bike fail');
    dispatch(setStatus('error', e.message));
    throw e;
  }
};
// eslint-disable-next-line no-unused-vars
// export const pickupReservationsFetch = pickupId => {};
