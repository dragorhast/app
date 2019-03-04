import PropTypes from 'prop-types';
// Actions
const PICKUP_SINGLE_SET = 'PICKUP_SINGLE_SET';
// Initial State
const INITIAL_STATE = {
  pickupId: '',
  name: '',
  coordinates: null,
  distance: null,
  status: '',
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
        ...payload,
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

export const pickupSingleFetch = () => {};
