import _ from 'lodash';
import { apiBikesFetch } from '../../api/tap2go';
import { BikePropTypes as BikePropTypesCopy } from './bikeSingle';
import { Firebase } from '../../constants/firebase';
import { pickupPointOrPrettyPrintCoords, bikeStatusFromString } from '../../util';

// Actions
const BIKES_LOADING = 'BIKES_LOADING';
const BIKES_SET = 'BIKES_SET';
const BIKES_FILTER_SET = 'BIKES_FILTER_SET';

// Initial State
const INITIAL_STATE = {
  loading: false,
  locationFilter: 'asc', // sorts ascending
  statusFilter: 'asc', // sorts ascending
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
        ...state,
        loading: false,
        bikes: payload,
      };
    case BIKES_FILTER_SET:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const setBikesLocationOrderAsc = boolean => ({
  type: BIKES_FILTER_SET,
  payload: {
    locationFilter: boolean ? 'asc' : 'desc',
  },
});

export const setBikesStatusFilterAsc = boolean => ({
  type: BIKES_FILTER_SET,
  payload: {
    statusFilter: boolean ? 'asc' : 'desc',
  },
});

const loadingBikes = (loading = true) => ({ type: BIKES_LOADING, payload: loading });

/**
 * Checks all bikes are correct.
 *
 * Allows for a different actionType to be passed
 * so that it can be utilised on different bike lists
 * (namely from pickupSingle)
 * @param bikes
 * @param actionType
 * @returns {{payload: *, type: string}}
 */
export const setBikes = (bikes, actionType = BIKES_SET) => {
  const checkBikeProperties = bike => {
    if (!bike.id || !bike.coordinates || !bike.status)
      throw new Error('Each bike must have correct properties for action');
  };
  bikes.forEach(bike => checkBikeProperties(bike));
  return { type: actionType, payload: bikes };
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
    const bikes = getRawBikeDataReady(bikesRaw);
    return dispatch(setBikes(bikes));
  } catch (e) {
    dispatch(loadingBikes(false));
    throw e;
  }
};

// Selectors
/**
 * Uses lodash to order the bikes by locationName + status
 *
 * true in the second [] = ascending. false = descending
 * @param bikes
 * @param locationFilter
 * @param statusFilter
 * @returns {*}
 */
export const getBikesWithFilter = (bikes, locationFilter, statusFilter) =>
  _.orderBy(bikes, ['locationName', 'status'], [locationFilter, statusFilter]);

// ******* Helper functions ******* //
export const getRawBikeDataReady = bikesRaw => {
  return bikesRaw.map(bike => {
    const locationName = !bike.connected
      ? 'Unknown Location'
      : bike.rented
      ? 'In Use'
      : pickupPointOrPrettyPrintCoords(bike.current_location);

    return {
      id: bike.identifier,
      /* Pickup name or lat, lng as a string */
      locationName,
      coordinates: !bike.connected ? 'Unknown' : bike.rented ? 'In Use' : bike.current_location.geometry.coordinates,
      status: bikeStatusFromString(bike.status),
      battery: bike.battery,
    };
  });
};
