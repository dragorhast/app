/**
 * All endpoints that connect to the
 * Dragorhast / Tap2Go Python API
 */
import axios from 'axios';
import { Firebase } from '../constants/firebase';
import CONSTANTS from '../constants/config';

/* ******** SETS UP AXIOS ******** */

/**
 * Axios that has the base url and
 * an interceptor to get the firebaseAuth
 *
 * @type {AxiosInstance}
 */
const axiosBaseUrl = axios.create({
  baseURL: CONSTANTS.apiBaseURL,
});

// Console.log Response + Requests

/**
 * Decides what to return based on JSend status
 *
 * - Success = return request
 * - Fail = throw error with message data.data.message
 * - Error = throw error with message data.message
 * @param response
 */
const checkJSendStatus = response => {
  switch (response.data.status) {
    case 'success':
      return response;
    case 'fail':
      throw new Error(response.data.data.message);
    case 'error':
      throw new Error(response.data.message);
    default:
      return response;
  }
};

axiosBaseUrl.interceptors.request.use(request => {
  return request;
});

axiosBaseUrl.interceptors.response.use(
  response => {
    // console.log('Response:', response);
    return checkJSendStatus(response);
  },
  error => {
    // console.log(JSON.parse(JSON.stringify(error)));
    return Promise.reject(error);
  }
);

/* ******** API ENDPOINTS ******** */

const getConfig = authToken => ({ headers: { Authorization: `Bearer ${authToken}` } });

/**
 * Signs up the user and returns their id in the db
 *
 * @param name
 * @param email
 * @param authToken
 * @returns {Promise<{dbId: number}>}
 */
export const apiSignUp = async (authToken, name, email) => {
  try {
    const result = await axiosBaseUrl.post(
      '/users',
      {
        first: name,
        email,
      },
      getConfig(authToken)
    );

    let user;
    if (result.data.data) {
      // eslint-disable-next-line prefer-destructuring
      user = result.data.data.user;
    } else {
      throw new Error('Server error creating user');
    }

    return {
      dbId: user.id,
    };
  } catch (e) {
    throw e;
  }
};

// no need async / await, just through the error
export const apiUserDelete = authToken => axiosBaseUrl.delete('/users/me', getConfig(authToken));

/**
 * Sets or updates a user's payment details
 *
 * @param authToken
 * @param stripeToken
 * @returns {AxiosPromise<any>}
 */
export const apiUserSetPaymentDetails = async (authToken, stripeToken) => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    await axiosBaseUrl.put(
      `/users/${dbId}/payment`,
      {
        token: stripeToken,
      },
      getConfig(authToken)
    );
    return null;
  } catch (e) {
    throw e;
  }
};

/**
 * Creates a new rental on a bike and returns the rental
 * info
 *
 * @param bikeId
 * @param authToken
 * @returns {Promise<*>}
 */
export const apiRentalStartId = async (authToken, bikeId) => {
  try {
    const result = await axiosBaseUrl.post(`/bikes/${bikeId}/rentals`, {}, getConfig(authToken));

    return result.data.data.rental;
  } catch (e) {
    throw e;
  }
};

/**
 * Fetches the current active rental on the currently
 * signed in user
 *
 * @returns {Promise<result.data.rental|{estimated_price, start_time, bike_id, current_location}>}
 */
export const apiRentalFetchCurrent = async authToken => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    const result = await axiosBaseUrl.get(`/users/${dbId}/rentals/current`, getConfig(authToken));
    // TEST - Sets current location
    return result.data.data.rental;
  } catch (e) {
    // TODO find a better way to handle this as this couples to rental rentalFetchInfo()
    if (
      e.response &&
      e.response.data &&
      e.response.data.data &&
      e.response.data.data.message &&
      e.response.data.data.message === 'You have no current rental.'
    ) {
      throw new Error('NO RENTAL');
    }
    throw e;
  }
};

/**
 * Ends / cancels the current active rental for the
 * signed in user
 *
 * If cancel = true given as arg then
 *
 * @param authToken
 * @param cancel
 * @returns {Promise<result.data.rental|{price, bike_id}>}
 */
export const apiRentalEndCurrent = async (authToken, cancel = false) => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    const result = await axiosBaseUrl.patch(
      `/users/${dbId}/rentals/current/${cancel ? 'cancel' : 'complete'}`,
      {},
      getConfig(authToken)
    );
    return result.data.data.rental;
  } catch (e) {
    throw e;
  }
};

/**
 * Creates an issue on the current signed in user's
 * end point
 *
 * Attaches bikeId if present
 *
 * @param data - { bike_id, description } or just { description }
 * @param authToken
 * @returns {Promise<void>}
 */
export const apiIssueCreate = async (authToken, data) => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    const result = await axiosBaseUrl.post(`/users/${dbId || 'me'}/issues`, data, getConfig(authToken));
    // const result = { data: { issue: { id: 1, description, bike_id: bikeId } } };
    return result.data.data.rental;
  } catch (e) {
    throw e;
  }
};

/**
 * Fetches all OPEN issues
 *
 * Must be admin to access
 *
 * @param authToken
 * @returns {Promise<*>}
 */
export const apiIssuesFetch = async authToken => {
  const result = await axiosBaseUrl.get('/issues', getConfig(authToken));
  return result.data.data.issues;
};

/**
 * Gets all pickup points - at some point will
 * be in order of closes to current location and
 * within the range
 *
 * @param latitude
 * @param longitude
 * @param range
 * @returns {Promise<pickupsReducer|Array>}
 */
export const apiPickupPointsFetch = async (latitude = 55.949159, longitude = -3.199293, range = 4) => {
  try {
    const result = await axiosBaseUrl.get(`/pickups?latitude=${latitude}&longitude=${longitude}&range=${range}miles`);
    return result.data.data.pickups;
  } catch (e) {
    throw e;
  }
};

/**
 * Gets information for a single Pickup Point
 *
 * @param authToken
 * @param id
 * @returns {Promise<*>}
 */
export const apiPickupFetchSingle = async (authToken, id) => {
  const result = await axiosBaseUrl.get(`/pickups/${id}`, getConfig(authToken));
  return result.data.data.pickup;
};

export const apiPickupFetchBikes = async (authToken, pickupId) => {
  const result = await axiosBaseUrl.get(`/pickups/${pickupId}/bikes`, getConfig(authToken));
  return result.data.data.bikes;
};

export const apiPickupFetchReservations = async (authToken, pickupId) => {
  const result = await axiosBaseUrl.get(`/pickups/${pickupId}/reservations`, getConfig(authToken));
  return result.data.data.reservations;
};

/**
 * Api end point to create a reservation at a location
 * for a set date date and time
 *
 * @param authToken
 * @param pickupId
 * @param datetime
 * @returns {Promise<void>}
 */
export const apiReservationCreate = async (authToken, pickupId, datetime) => {
  // throw new Error('NO PAYMENT METHOD'); // TESTING
  try {
    const result = await axiosBaseUrl.post(
      `/pickups/${pickupId}/reservations`,
      {
        reserved_for: datetime,
      },
      getConfig(authToken)
    );

    return result.data.data.reservation;
  } catch (e) {
    throw e;
  }
};

/**
 * Api end point to cancel a reservation that is in the future
 *
 * @param authToken
 * @param reservationId
 * @returns {Promise<>}
 */
export const apiReservationCancel = async (authToken, reservationId) => {
  try {
    const result = await axiosBaseUrl.delete(`/reservations/${reservationId}`, getConfig(authToken));
    return result.data.data.reservation;
  } catch (e) {
    throw e;
  }
};

/**
 * Api end point to fetch all reservations for a user that
 * have not been collected and are in the future
 *
 * @param authToken
 * @returns {Promise<*>}
 */
export const apiReservationsUserFetch = async authToken => {
  const dbId = Firebase.auth().currentUser.photoURL;
  const result = await axiosBaseUrl.get(`/users/${dbId || 'me'}/reservations/current`, getConfig(authToken));
  return result.data.data.reservations;
};

/**
 * Api end point to fetch all reservations
 * must be an admin to access
 *
 * @param authToken
 * @returns {Promise<*>}
 */
export const apiReservationsAdminFetch = async authToken => {
  const result = await axiosBaseUrl.get('/reservations', getConfig(authToken));
  return result.data.data.reservations;
};

/**
 * Api end point to fetch data for a single reservation
 * @param authToken
 * @param reservationId
 * @returns {Promise<void>}
 */
export const apiReservationSingleFetch = async (authToken, reservationId) => {
  const result = await axiosBaseUrl.get(`/reservations/${reservationId}`, getConfig(authToken));
  return result.data.data.reservation;
};

/**
 * Api end point to fetch all of the bikes on the system
 * @returns {Promise<*>}
 */
export const apiBikesFetch = async authToken => {
  console.log(authToken);
  const result = await axiosBaseUrl.get('/bikes', getConfig(authToken));
  return result.data.data.bikes;
};

/**
 * Api end point for a single bike based on its
 * identifier 6 digit hex number
 *
 * @param authToken
 * @param bikeId
 * @returns {Promise<BikeListItem.propTypes.bike|{}>}
 */
export const apiBikeSingleFetch = async (authToken, bikeId) => {
  const result = await axiosBaseUrl.get(`/bikes/${bikeId}`, getConfig(authToken));
  return result.data.data.bike;
};
