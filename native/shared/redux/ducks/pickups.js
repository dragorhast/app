import PropTypes from 'prop-types';
import { setStatus } from './status';
import { apiPickupPointsFetch } from '../../api/tap2go';
// Actions
const PICKUPS_LOADING = 'PICKUPS_LOADING';
const PICKUPS_SET = 'PICKUPS_SET';

// Initial state
const INITIAL_STATE = {
  loading: false,
  pickups: [],
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
};
// Reducer
export default function pickupsReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case PICKUPS_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case PICKUPS_SET:
      return {
        loading: false,
        pickups: payload,
      };
    default:
      return state;
  }
}

// Action creators
/**
 * Sets the loading status
 *
 * Automatically sets to true if not passed a value
 * @param loadingStatus
 * @returns {{payload: boolean, type: string}}
 */
const loadingPickups = (loadingStatus = true) => ({ type: PICKUPS_LOADING, payload: loadingStatus });

/**
 * Checks each pickup has the required input then sets in reducer
 *
 * @param pickups [ pickupPoint ]
 * @returns {{payload: *, type: string}}
 */
const setPickups = pickups => {
  const checkNameAndCoordinates = pickup => {
    if (!pickup.name || !pickup.coordinates) throw new Error('Each pickup must have name + coordinates to set');
  };
  pickups.forEach(pickup => checkNameAndCoordinates(pickup));

  return { type: PICKUPS_SET, payload: pickups };
};

// Async actions
export const pickupPointsFetch = currentLocation => async dispatch => {
  try {
    dispatch(loadingPickups(true));

    const pickupsRaw = await apiPickupPointsFetch(currentLocation);

    // Gets our required from GeoJson structure - distance might be undefined
    let allDistances = true;
    const pickups = pickupsRaw.map(pickup => {
      if (!pickup.properties.distance) allDistances = false;
      return {
        pickupId: pickup.properties.id,
        name: pickup.properties.name,
        coordinates: pickup.properties.center,
        distance: pickup.properties.distance,
      };
    });

    // if (!allDistances) dispatch(setStatus('error', "Sorry couldn't get all distances from current location"));

    return dispatch(setPickups(pickups));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

// Selectors - sort by distance
