import PropTypes from 'prop-types';
import { setStatus } from './status';
import { Firebase } from '../../constants/firebase';
import { apiReservationCreate } from '../../api/tap2go';
import { setSingleReservationDisplay } from './reservationDisplay';

// Prop Types
export const ReservationCreationPropTypes = {
  pickupId: PropTypes.number,
  pickupName: PropTypes.string,
  datetime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

// Actions
const RESERVATION_CREATION_START = 'RESERVATION_CREATION_START';
const RESERVATION_CREATION_SET_DATETIME = 'RESERVATION_CREATION_SET_DATETIME';
const RESERVATION_CREATION_CLEAR = 'RESERVATION_CREATION_CLEAR';
// Initial State
const INITIAL_STATE = {
  pickupId: null,
  pickupName: null,
  datetime: null,
};

// Reducer
export default function reservationCreationReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case RESERVATION_CREATION_START:
      return {
        pickupId: payload.id,
        pickupName: payload.name,
        datetime: new Date(),
      };
    case RESERVATION_CREATION_SET_DATETIME:
      return {
        ...state,
        datetime: payload,
      };
    case RESERVATION_CREATION_CLEAR:
      return INITIAL_STATE;
    default:
      return state;
  }
}
// Actions
const startReservationCreation = ({ id, name }) => ({
  type: RESERVATION_CREATION_START,
  payload: { id, name },
});

export const setDateTimeReservationCreation = datetime => ({
  type: RESERVATION_CREATION_SET_DATETIME,
  payload: datetime,
});

const clearReservationCreation = () => ({
  type: RESERVATION_CREATION_CLEAR,
});

// Thunks
/**
 * Sets state to loading in between setting store for start reservation
 *
 *
 * @param id
 * @param name
 * @returns {Function}
 */
export const reservationStart = ({ id, name }) => async dispatch => {
  try {
    await dispatch(setStatus('loading', true));
    await dispatch(startReservationCreation({ id, name }));
    await dispatch(setStatus('loading', false));
  } catch (e) {
    await dispatch(setStatus('error', 'Unable to start reservations'));
    Promise.resolve();
  }
};
/**
 * Sends the required information to the API
 * to create a reservation for the user at a pickup point
 *
 * Sets the reservationDisplay on completion for re-routing
 * Returns the reservation
 *
 * @returns {Function}
 */
export const reservationMake = reserveNow => async (dispatch, getState) => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const { reserveCreate } = getState();
    const datetime = reserveNow ? new Date() : reserveCreate.datetime;
    const reservation = await apiReservationCreate(authToken, reserveCreate.pickupId, datetime);
    dispatch(clearReservationCreation());
    // TODO remove this in to call back
    await dispatch(
      setSingleReservationDisplay({
        reservationId: reservation.id,
        datetime: reservation.reserved_for,
        pickupName: reservation.pickup.properties.name,
        pickupId: reservation.pickup.properties.id,
        pickupLocation: reservation.pickup.properties.center,
      })
    );
    dispatch(setStatus('success', 'Reservation created!'));
    return reservation;
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

// Selectors
