import PropTypes from 'prop-types';

// Actions
const BIKE_SINGLE_SET = 'BIKE_SINGLE_SET';

// Initial State
const INITIAL_STATE = {
  id: '',
  locationName: '',
  coordinates: [0, 0],
  status: '',
  battery: '',
};

// Prop Types
export const BikePropTypes = {
  id: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  status: PropTypes.string.isRequired,
  battery: PropTypes.number.isRequired,
};

// Reducer
export default function bikeSingleReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case BIKE_SINGLE_SET:
      return {
        ...payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const setBike = ({ id, locationName, coordinates, status, battery }) => ({
  type: BIKE_SINGLE_SET,
  payload: {
    id,
    locationName,
    coordinates,
    status,
    battery,
  },
});
