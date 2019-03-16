import PropTypes from 'prop-types';
import { setStatus } from './status';
import { apiBikeSingleFetch, apiBikeSingleFetchIssues, apiBikeUpdateStatus } from '../../api/tap2go';
import { Firebase } from '../../constants/firebase';
import { pickupPointOrPrettyPrintCoords, bikeStatusFromString } from '../../util';
import { IssueSinglePropTypes, getRawIssuesDataReady } from './issues';

// Actions
const BIKE_SINGLE_SET = 'BIKE_SINGLE_SET';
const BIKE_SINGLE_ISSUES_SET = 'BIKE_SINGLE_ISSUES_SET';

// Initial State
const INITIAL_STATE = {
  id: '',
  locationName: '',
  coordinates: [0, 0],
  status: '',
  battery: '',
  issues: [],
};

// Prop Types
export const BikePropTypes = {
  id: PropTypes.string.isRequired,
  locationName: PropTypes.string.isRequired,
  coordinates: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number).isRequired, PropTypes.string.isRequired]),
  status: PropTypes.string.isRequired,
  battery: PropTypes.number.isRequired,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      ...IssueSinglePropTypes,
    })
  ),
};

// Reducer
export default function bikeSingleReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case BIKE_SINGLE_SET:
      return {
        ...state,
        ...payload,
      };
    case BIKE_SINGLE_ISSUES_SET:
      return {
        ...state,
        issues: payload,
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

export const setBikeIssues = issues => ({
  type: BIKE_SINGLE_ISSUES_SET,
  payload: issues,
});

// Thunks

export const bikeSingleFetch = bikeId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const bike = await apiBikeSingleFetch(authToken, bikeId);

    await dispatch(setBike(getBikeSingleRawReady(bike)));

    return dispatch(setStatus('loading', false));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

export const bikeSingleFetchIssues = bikeId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const issuesRaw = await apiBikeSingleFetchIssues(authToken, bikeId);

    await dispatch(setBikeIssues(getRawIssuesDataReady(issuesRaw)));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

/**
 * Calls api to decide if bike should be in/our circulation
 * and if the bike should be locked or not
 *
 * true - put in circulation + locked
 * false - take out + unlock
 *
 * @param bikeId
 * @param putInCirc
 * @returns {Function}
 */
export const bikeTakeInOutCirc = (bikeId, putInCirc) => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    // if putting in circ lock bike, if taking out of circ unlock (so operator can move bike)
    const bike = await apiBikeUpdateStatus(authToken, bikeId, putInCirc, putInCirc);
    await dispatch(setBike(getBikeSingleRawReady(bike)));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

// ***** HELPER FUNCTIONS ****** //

const getBikeSingleRawReady = bikeRaw => {
  const bikeRented = !bikeRaw.current_location;
  return {
    id: bikeRaw.identifier,
    locationName: bikeRented ? 'IN USE' : pickupPointOrPrettyPrintCoords(bikeRaw.current_location),
    coordinates: bikeRented ? null : bikeRaw.current_location.geometry.coordinates,
    status: bikeStatusFromString(bikeRaw.status),
    battery: bikeRaw.battery,
  };
};
