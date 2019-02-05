/**
 * All endpoints that connect to the
 * Dragorhast / Tap2Go Python API
 */
import axios from 'axios';
import { Firebase } from '../constants/firebase';
import CONSTANTS from '../constants/config';

/* ******** SETS UP AXIOS ******** */
/**
 * Axios that hase the baseUrl attached
 * @type {AxiosInstance}
 */
const axiosNoAuth = axios.create({
  baseURL: CONSTANTS.apiBaseURL,
});

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

// axiosAuth.interceptors.request.use(request => {
//   console.log('Starting Request', request);
//   return request;
// });

axiosAuth.interceptors.response.use(
  response => {
    // console.log('Response:', response);
    return response;
  },
  error => {
    return error.response;
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
export const apiSignUp = async (name, email, authToken) => {
  try {
    const result = await axiosAuth.post(
      '/users',
      {
        first: name,
        email,
      },
      getConfig(authToken)
    );

    const { user } = result.data.data;

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
export const apiRentalStartId = async (bikeId, authToken) => {
  // console.log(authToken);
  try {
    const result = await axiosAuth.post(`/bikes/${bikeId}/rentals`, {}, getConfig(authToken));

    // const result = {
    //   data: {
    //     rental: {
    //       bike_id: '8861b3',
    //       start_time: new Date(),
    //       estimated_price: 0,
    //     },
    //   },
    // };
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
  console.log(authToken);
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    const result = await axiosAuth.get(`/users/${dbId || 'me'}/rentals/current`, getConfig(authToken));
    // const result = {
    //   data: {
    //     rental: {
    //       bike_id: '8861b3',
    //       start_time: new Date().setHours(0, 0, 0, 0),
    //       estimated_price: 4,
    //       current_location: { properties: { type: 'Pickup Point' } },
    //     },
    //   },
    // };

    // TODO handle better
    if (result.data.data.message === 'You have no current rental.') throw new Error('NO RENTAL');

    // TEST - Sets current location
    if (result.data.data.rental) result.data.data.rental.current_location = { properties: { type: 'Pickup Point' } };
    return result.data.data.rental;
  } catch (e) {
    throw e;
  }
};

/**
 * Ends the current active rental for the
 * signed in user
 *
 * @returns {Promise<result.data.rental|{price, bike_id}>}
 */
export const apiRentalEndCurrent = async authToken => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    const result = await axiosAuth.delete(`/users/${dbId || 'me'}/rentals/current`, getConfig(authToken));

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
 * @param bikeId
 * @param description
 * @returns {Promise<void>}
 */
export const apiIssueCreate = async ({ bikeId, description }, authToken) => {
  const dbId = Firebase.auth().currentUser.photoURL;
  const data = bikeId ? { description, bike_identifier: bikeId } : { description };
  try {
    const result = await axiosAuth.post(`/users/${dbId || 'me'}/issues`, data, getConfig(authToken));
    // const result = { data: { issue: { id: 1, description, bike_id: bikeId } } };
    return result.data.data.rental;
  } catch (e) {
    throw e;
  }
};

// Only Sections that matter
const pickup1 = {
  geometry: {
    geometries: [
      {
        type: 'Point',
        coordinates: [55.949159, -3.199293],
      },
    ],
  },
  properties: {
    name: 'Princes St West',
    distance: 1.2,
  },
};
const pickup2 = {
  geometry: {
    geometries: [
      {
        type: 'Point',
        coordinates: [55.949159, -3.199293],
      },
    ],
  },
  properties: {
    name: 'George St',
    distance: 1.8,
  },
};
const pickup3 = {
  geometry: {
    geometries: [
      {
        type: 'Point',
        coordinates: [55.949159, -3.199293],
      },
    ],
  },
  properties: {
    name: 'Toll Cross',
    distance: 2.4,
  },
};
export const apiPickupPointsFetch = async (lat = 55.949159, long = -3.199293, range = 4) => {
  try {
    // TODO find out if long or lng
    // const result = await axiosAuth.get(`/pickups?lat=${lat}&long=${long}&range=${range}miles`);
    const result = {
      data: {
        pickups: [pickup1, pickup2, pickup3],
      },
    };
    return result.data.pickups;
  } catch (e) {
    throw e;
  }
};
