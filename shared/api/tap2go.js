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
export const apiStartRentalId = async bikeId => {
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

export const apiFetchCurrentRental = async () => {
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

export const apiEndCurrentRental = async () => {
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
}
