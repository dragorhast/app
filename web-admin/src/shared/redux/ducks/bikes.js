import { apiBikesFetch } from '../../api/tap2go';
import { BikePropTypes as BikePropTypesCopy } from './bikeSingle';
import { Firebase } from '../../constants/firebase';
import { pickupPointOrPrettyPrintCoords, bikeStatusFromString } from '../../util';

// Actions
const BIKES_LOADING = 'BIKES_LOADING';
const BIKES_SET = 'BIKES_SET';

// Initial State
const INITIAL_STATE = {
  loading: false,
  bikes: [],
};
// Prop Types
// Allows both to be aligned to their own duck
export const BikePropTypes = BikePropTypesCopy;

// Reducer
export default function bikesReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case BIKES_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case BIKES_SET:
      return {
        loading: false,
        bikes: payload,
      };
    default:
      return state;
  }
}

// Action Creators
const loadingBikes = (loading = true) => ({ type: BIKES_LOADING, payload: loading });

const setBikes = bikes => {
  const checkBikeProperties = bike => {
    if (!bike.id || !bike.coordinates || !bike.status)
      throw new Error('Each bike must have correct properties for action');
  };
  bikes.forEach(bike => checkBikeProperties(bike));
  return { type: BIKES_SET, payload: bikes };
};

// Thunks
/**
 * Fetches the information for all bikes
 *
 * @returns {Function}
 */
export const bikesFetch = () => async dispatch => {
  try {
    dispatch(loadingBikes(true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const bikesRaw = await apiBikesFetch(authToken);

    // Gets api response ready for reducer
    const bikes = bikesRaw.map(bike => {
      // No current_location if rented
      const bikeRented = !bike.current_location;
      return {
        id: bike.identifier,
        /* Pickup name or lat, lng as a string */
        locationName: bikeRented ? 'IN USE' : pickupPointOrPrettyPrintCoords(bike.current_location),
        coordinates: bikeRented ? null : bike.current_location.geometry.coordinates,
        status: bikeStatusFromString(bike.status),
        battery: bike.battery,
      };
    });
    return dispatch(setBikes(bikes));
  } catch (e) {
    dispatch(loadingBikes(false));
    throw e;
  }
};

// Selectors
// TODO add selectors for sorting the list of bikes
