import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { apiRentalStartId, apiRentalFetchCurrent, apiRentalEndCurrent } from '../../api/tap2go';

// Actions
const RENTAL_SET_ALL = 'RENTAL_SET_ALL';
const RENTAL_UPDATE = 'RENTAL_UPDATE';
const RENTAL_CLEAR = 'RENTAL_CLEAR';

// Initial State
const INITIAL_STATE = {
  bikeId: null,
  startTime: null,
  costSoFar: null,
  withinPickUpPointGeo: null,
  ableToBeReturned: null,
};

// Prop Types

// Reducer
export default function rentalReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case RENTAL_SET_ALL:
      return payload;
    // only alter those that have been passed - lodash
    case RENTAL_UPDATE:
    case RENTAL_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
}
// Actions
export const setAllRental = rental => ({
  type: RENTAL_SET_ALL,
  payload: rental,
});

export const updateRental = updateField => ({
  type: RENTAL_UPDATE,
  payload: updateField,
});

export const clearRental = () => ({ type: RENTAL_CLEAR });

// Async Actions
/**
 * Creates a rental in the db if the user scans/types
 * in the code associated with a bike
 *
 * - Loading
 * - Hits DB
 * - Checks JSend Status ? <-- this should be done inside the API call
 * - setRental
 * - set success
 * - any errors set errors
 * @param bikeId
 * @returns {Function}
 */
export const rentalStartFromId = bikeId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();

    const rental = await apiRentalStartId(bikeId, authToken);
    dispatch(
      setAllRental({
        bikeId: rental.bike_identifier,
        startTime: rental.start_time,
        costSoFar: rental.estimated_price,
        withinPickUpPointGeo: true, // TODO check
        ableToBeReturned: true, // TODO check
      })
    );

    return dispatch(setStatus('success', 'Rental Started!'));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

/**
 * Gets the user's current rental info
 * Note: no loading for better UI
 *
 * - Hit API
 * - Update rental reducer
 * - return success
 */
export const rentalFetchInfo = () => async dispatch => {
  try {
    // Fetching doesn't trigger Loading
    const authToken = await Firebase.auth().currentUser.getIdToken();
    const rental = await apiRentalFetchCurrent(authToken);

    const withinPickUpPoint =
      rental.current_location &&
      rental.current_location.properties &&
      rental.current_location.properties.type === 'Pickup Point';
    return dispatch(
      setAllRental({
        bikeId: rental.bike_identifier,
        startTime: rental.start_time,
        costSoFar: rental.estimated_price,
        withinPickUpPointGeo: withinPickUpPoint, // TODO check
        ableToBeReturned: withinPickUpPoint, // TODO check
      })
    );
  } catch (e) {
    // TODO handle better
    if (e.message === 'NO RENTAL') {
      await dispatch(clearRental());
      return Promise.resolve();
    }
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

/**
 * Ends the current rental
 * - Loads
 * - Hit API
 * - Sets success to cost
 * @returns {Function}
 */
export const rentalEnd = () => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();

    const rental = await apiRentalEndCurrent(authToken);
    dispatch(clearRental());
    return dispatch(setStatus('success', `Nice trip. £${rental.price} Has been charged`));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

// Selectors - put working out time here

/**
 * Selector to return the normal reducer structure
 * plus a displayable string with the hours and minutes since
 * the rental has started
 * https://egghead.io/lessons/javascript-redux-colocating-selectors-with-reducers
 */
export const getWithTimeRentalsBeenActive = () => {};
