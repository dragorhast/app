import { PickupPropTypes as PickupPropTypesCopy } from './pickupSingle';
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
// Allows both to be aligned to their own duck
export const PickupPropTypes = PickupPropTypesCopy;

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
  const checkProperties = pickup => {
    if (!pickup.name || !pickup.coordinates || !pickup.status)
      throw new Error('Each pickup must have name, coordinates + status to set');
  };
  pickups.forEach(pickup => checkProperties(pickup));

  return { type: PICKUPS_SET, payload: pickups };
};

// Async actions
export const pickupPointsFetch = currentLocation => async dispatch => {
  try {
    dispatch(loadingPickups(true));

    const pickupsRaw = await apiPickupPointsFetch(currentLocation);

    // Gets our required from GeoJson structure - distance might be undefined
    // let allDistances = true;
    const pickups = pickupsRaw.map(pickup => {
      // if (!pickup.properties.distance) allDistances = false;
      return {
        pickupId: pickup.properties.id,
        name: pickup.properties.name,
        coordinates: pickup.properties.center,
        distance: pickup.properties.distance,
        status: decideBikeStatus(pickup.properties.bikes || []),
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
/*
Steps to make selector
- Add field + asc / desc filter to this store
- add non memoized selector to get the pickups
- add memoized selector to sort based on filters
- call that one in mapStateToProps
 */
export const sortPickups = () => {};

// Helper Functions
/**
 * Based on the number of bikes at a
 * pickup point decided status
 *
 * @param bikeArray
 * @returns {string}
 */
const decideBikeStatus = bikeArray => {
  switch (bikeArray.length) {
    case bikeArray < 5:
      return 'Low';
    case bikeArray < 12:
      return 'Medium';

    case bikeArray >= 12:
      return 'High';
    default:
      return 'Unknown';
  }
};
