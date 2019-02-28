import PropTypes from 'prop-types';
import Capitalize from 'capitalize';
import { apiBikesFetch } from '../../api/tap2go';

// Actions
const BIKES_LOADING = 'BIKES_LOADING';
const BIKES_SET = 'BIKES_SET';

// Initial State
const INITIAl_STATE = {
  loading: false,
  bikes: [],
};
// Prop Types
export const BikePropTypes = {
  id: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  status: PropTypes.string.isRequired,
};

// Reducer
export default function bikesReducer(state = INITIAl_STATE, { type, payload }) {
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
  console.log('Inside setBikes: ', bikes);
  const checkBikeProperties = bike => {
    if (!bike.id || !bike.coordinates || !bike.status)
      throw new Error('Each bike must have correct properties for action');
  };
  bikes.forEach(bike => checkBikeProperties(bike));
  return { type: BIKES_SET, payload: bikes };
};

// Thunks

/**
 * Returns a proper readable string based on
 * the status given from the api
 *
 * @param status
 * @returns {*}
 */
const bikeStatusFromString = status => {
  switch (status) {
    case 'available' || 'broken' || 'rented':
      return Capitalize(status);
    case 'needs_serviced':
      return 'Needs Serviced';
    case 'out_of_circulation':
      return 'Out Of Circ';
    default:
      throw new Error('Status unknown');
  }
};

export const bikesFetch = () => async dispatch => {
  try {
    dispatch(loadingBikes(true));

    const bikesRaw = await apiBikesFetch();

    // Helper for getting response ready for reducer
    const pickupPointOrPrettyPrintCoords = location =>
      (location.features && location.features.pickup) ||
      `${location.geometry.coordinates[0].toFixed(2)}, ${location.geometry.coordinates[1].toFixed(2)}`;

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
