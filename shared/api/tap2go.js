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
const axiosAuth = axios.create({
  baseURL: CONSTANTS.apiBaseURL,
});

// Console.log Response + Requests

/**
 * Decides what to return based on JSend status
 *
 * - Success = return request
 * - Fail = throw error with message data.data.message
 * - Error = throw error with message data.message
 * @param data
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

axiosAuth.interceptors.request.use(request => {
  console.log(request);
  return request;
});

axiosAuth.interceptors.response.use(
  response => {
    // console.log('Response:', response);
    return checkJSendStatus(response);
  },
  error => {
    console.log(JSON.parse(JSON.stringify(error)));
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
 * @param firebaseId
 * @param authToken
 * @returns {Promise<{dbId: number}>}
 */
export const apiSignUp = async (authToken, name, email) => {
  try {
    const result = await axiosAuth.post(
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
export const apiUserDelete = authToken => axiosAuth.delete('/users/me', getConfig(authToken));

/**
 * Creates a new rental on a bike and returns the rental
 * info
 *
 * @param bikeId
 * @param authToken
 * @returns {Promise<*>}
 */
export const apiRentalStartId = async (authToken, bikeId) => {
  // console.log(authToken);
  try {
    const result = await axiosAuth.post(`/bikes/${bikeId}/rentals`, {}, getConfig(authToken));

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
  // console.log(authToken);
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    const result = await axiosAuth.get(`/users/${dbId}/rentals/current`, getConfig(authToken));
    // TEST - Sets current location
    if (result.data.data.rental) result.data.data.rental.current_location = { properties: { type: 'Pickup Point' } };
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
    const result = await axiosAuth.patch(
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
// eslint-disable-next-line camelcase
export const apiIssueCreate = async (authToken, data) => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    const result = await axiosAuth.post(`/users/${dbId || 'me'}/issues`, data, getConfig(authToken));
    // const result = { data: { issue: { id: 1, description, bike_id: bikeId } } };
    return result.data.data.rental;
  } catch (e) {
    throw e;
  }
};

export const apiPickupPointsFetch = async (latitude = 55.949159, longitude = -3.199293, range = 4) => {
  try {
    const result = await axiosAuth.get(`/pickups?latitude=${latitude}&longitude=${longitude}&range=${range}miles`);
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
  const result = await axiosAuth.get(`/pickups/${id}`, getConfig(authToken));
  return result.data.data.pickup;
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
  try {
    const result = await axiosAuth.post(
      `/pickups/${pickupId}/reservations`,
      {
        reserved_for: datetime,
      },
      getConfig(authToken)
    );
    // const result = {
    //   data: {
    //     data: {
    //       reservation: {
    //         id: 1,
    //         reserved_for: new Date(2019, 2, 10, 18, 30),
    //         pickup: {
    //           ...pickup1,
    //         },
    //       },
    //     },
    //   },
    // };
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
 * @returns {Promise<result.data.data.reservation|{id}>}
 */
export const apiReservationCancel = async (authToken, reservationId) => {
  try {
    // TODO waiting for the reservation end point to be changed
    // const result = await axiosAuth.delete(`/reservations/${reservationId}`, getConfig(authToken));
    const dbId = Firebase.auth().currentUser.photoURL;
    await axiosAuth.delete(`/users/${dbId}/reservations/current`, getConfig(authToken));
    return null;
  } catch (e) {
    throw e;
  }
};

/**
 * Api end point to fetch all rentals for a user that
 * have not been collected and are in the future
 *
 * @param authToken
 * @returns {Promise<*>}
 */
export const apiReservationsFetch = async authToken => {
  const dbId = Firebase.auth().currentUser.photoURL;
  // TODO remove current from end
  const result = await axiosAuth.get(`/users/${dbId || 'me'}/reservations/current`, getConfig(authToken));
  return result.data.data.reservation; // TODO add s
};
