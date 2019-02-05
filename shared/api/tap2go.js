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

/**
 * Function to hand to interceptor
 * if request is not valid
 *
 * @param error
 * @returns {Promise<never>}
 */
const axiosRequestFail = error => Promise.reject(error);

/**
 * Function to hand to axio interceptor
 * to get the Firebase auth token
 *
 * @param config
 * @returns {Promise<void>}
 */
const editAxiosHeader = async config => {
  // If Auth already attached then don't change
  if (!config.headers.Authorization) {
    if (!Firebase.auth().currentUser) {
      throw new Error('User is not authenticated');
    }

    const authToken = await Firebase.auth().currentUser.getIdToken();
    config.Authorization = `Bearer ${authToken}`;
  }

  return config;
};

axiosAuth.interceptors.request.use(editAxiosHeader, axiosRequestFail);

/* ******** API ENDPOINTS ******** */

/**
 * Signs up the user and returns their id in the db
 *
 * @param name
 * @param email
 * @param firebaseId
 * @param authToken
 * @returns {Promise<{dbId: number}>}
 */
export const apiSignUp = async (name, email, firebaseId, authToken) => {
  try {
    // const result = await axiosAuth.post('/users', {
    //   body: {
    //     first: name,
    //     email,
    //     firebaseId,
    //   },
    //   headers: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // });

    // Check JSend status here or in axios response or in action

    // const user = result.data.user;
    const user = { id: 1 };
    return {
      dbId: user.id,
    };
  } catch (e) {
    throw e;
  }
};

/**
 * Creates a new rental on a bike and returns the rental
 * info
 *
 * @param bikeId
 * @returns {Promise<*>}
 */
export const apiRentalStartId = async bikeId => {
  try {
    // const result = await axiosAuth.post(`/bikes/${bikeId}/rentals`); // auth should be handled
    const result = {
      data: {
        rental: {
          bike_id: '8861b3',
          start_time: new Date(),
          estimated_price: 0,
        },
      },
    };
    return result.data.rental;
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
export const apiRentalFetchCurrent = async () => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    // const result = await axiosAuth.get(`/users/${dbId || 'me'}`);
    const result = {
      data: {
        rental: {
          bike_id: '8861b3',
          start_time: new Date().setHours(0, 0, 0, 0),
          estimated_price: 4,
          current_location: { properties: { type: 'Pickup Point' } },
        },
      },
    };

    return result.data.rental;
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
export const apiRentalEndCurrent = async () => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    // const result = await axiosAuth.delete(`/users/${dbId || 'me'}`);
    const result = {
      data: {
        rental: {
          bike_id: '8861b3',
          price: 3.5,
        },
      },
    };

    return result.data.rental;
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
export const apiIssueCreate = async ({ bikeId, description }) => {
  const dbId = Firebase.auth().currentUser.photoURL;
  try {
    // const result = await axiosAuth.post(`/users/${dbId || 'me'}/issues`);
    const result = { data: { issue: { id: 1, description, bike_id: bikeId } } };
    return result.data.rental;
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
