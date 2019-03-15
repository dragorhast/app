import _ from 'lodash';
import { PickupPropTypes as PickupPropTypesCopy } from './pickupSingle';
import { setStatus } from './status';
import { apiPickupPointsFetch } from '../../api/tap2go';
import { pickupStateFromBikeCount } from '../../util';
// Actions
const PICKUPS_LOADING = 'PICKUPS_LOADING';
const PICKUPS_SET = 'PICKUPS_SET';
const PICKUPS_FILTER_SET = 'PICKUPS_FILTER_SET';

// Initial state
const INITIAL_STATE = {
  loading: false,
  nameFilter: 'asc', // ascending
  statusFilter: 'asc',
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
        ...state,
        loading: false,
        pickups: payload,
      };
    case PICKUPS_FILTER_SET:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

// Action creators
export const setPickupNameOrderAsc = boolean => ({
  type: PICKUPS_FILTER_SET,
  payload: {
    nameFilter: boolean ? 'asc' : 'desc',
  },
});

export const setPickupStatusOrderAsc = boolean => ({
  type: PICKUPS_FILTER_SET,
  payload: {
    statusFilter: boolean ? 'asc' : 'desc',
  },
});
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
      const coordinates = [];
      pickup.geometry.coordinates[0].forEach(([x, y]) => {
        coordinates.push({ lat: y, lng: x });
      });

      // if (!pickup.properties.distance) allDistances = false;
      return {
        pickupId: pickup.properties.id,
        name: pickup.properties.name,
        coordinates,
        distance: pickup.properties.distance,
        status: pickupStateFromBikeCount(pickup.properties.bikes || []),
      };
    });

    // if (!allDistances) dispatch(setStatus('error', "Sorry couldn't get all distances from current location"));
    return dispatch(setPickups(pickups));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

// Selectors
export const getPickupsWithFilters = (pickups, nameFilter, statusFilter) =>
  _.orderBy(pickups, ['name', 'status'], [nameFilter, statusFilter]);
