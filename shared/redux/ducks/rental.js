import PropTypes from 'prop-types';
import { Firebase } from '../../constants/firebase';
import { setStatus } from './status';
import ErrorMessages from '../../constants/errors';
import { apiStartRentalId } from '../../api/tap2go';

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

    const rental = await apiStartRentalId(bikeId);
    dispatch(
      setAllRental({
        bikeId: rental.bike_id,
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

// Selectors - put working out time here
