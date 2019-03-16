import PropTypes from 'prop-types';
import { Firebase } from '../../constants/firebase';
import { firebaseLoginEmail, firebaseSignUpEmail, firebaseUpdateProfile } from '../../api/firebase';
import { apiSignUp } from '../../api/tap2go';
import { setStatus } from './status';
import ErrorMessages from '../../constants/errors';

// Actions
const USER_SET = 'USER_SET';
const USER_RESET = 'USER_RESET';
const USER_SET_FIELD = 'USER_SET_FIELD';

// Initial State
const INITIAL_STATE = {
  firebaseId: null,
  dbId: null, // id in database
  email: null,
  userType: null,
  error: null,
};

// Prop Types
export const userPropTypes = {
  firebaseId: PropTypes.string,
  dbId: PropTypes.string, // will be number but string in firebase as displayName
  email: PropTypes.string,
  userType: PropTypes.string,
  error: PropTypes.string,
};

// Reducer
export default function userReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case USER_SET:
      return {
        firebaseId: payload.firebaseId,
        dbId: payload.dbId,
        email: payload.email,
        userType: payload.userType,
        error: null,
      };
    case USER_RESET:
      return INITIAL_STATE;
    case USER_SET_FIELD:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const setUser = (firebaseId, dbId, email, userType) => ({
  type: USER_SET,
  payload: {
    firebaseId,
    dbId,
    email,
    userType,
  },
});

export const resetUser = () => ({ type: USER_RESET });

const setUserField = keyValue => ({ type: USER_SET_FIELD, payload: keyValue });

// Async Action calls

/**
 * Signs up up the user through firebase + the api
 *
 * - Signs up user firebase
 * - Signs up user api
 * - Sets firebase display name and photoURL
 * (photoURL is the users id in the api db)
 *
 * - if anything goes wrong in stages 2/3 delete the user
 */
export const userSignUp = formData => async dispatch => {
  const { email, password, password2, firstName, lastName } = formData;
  try {
    // Loading
    dispatch(setStatus('loading', true));

    // Checks all of the inputs
    if (!firstName) throw ErrorMessages.missingFirstName;
    if (!lastName) throw ErrorMessages.missingLastName;
    if (!email) throw ErrorMessages.missingEmail;
    if (!password) throw ErrorMessages.missingPassword;
    if (!password2) throw ErrorMessages.missingPassword;
    if (password !== password2) throw ErrorMessages.passwordsDontMatch;

    const name = `${firstName} ${lastName}`;

    const userFirebase = await firebaseSignUpEmail(email, password);
    const userDb = await apiSignUp(userFirebase.authToken, name, email);
    await firebaseUpdateProfile({ id: userDb.dbId, name });
    dispatch(setUser(userFirebase.uid, userDb.dbId, email));
    // Stop loading
    return dispatch(setStatus('success', 'Welcome!'));
  } catch (error) {
    if (Firebase.auth().currentUser) {
      // Attempts to delete
      Firebase.auth().currentUser.delete();
    }
    // auto sets loading to false
    dispatch(setStatus('error', error.message));
    throw error;
  }
};

/**
 * Logs in the user through firebase and sets the reducer
 *
 * returns the user object
 * @type {{}}
 */
export const userLogin = ({ email, password, adminCheck } = false) => async dispatch => {
  try {
    // Loading
    dispatch(setStatus('loading', true));

    // Login
    const user = await firebaseLoginEmail(email, password);
    const tokenResult = await Firebase.auth().currentUser.getIdTokenResult();
    const userType = tokenResult.claims.user_type;

    if (adminCheck) {
      if (userType !== 'manager' && userType !== 'operator') {
        await Firebase.auth().signOut();
        throw new Error('Must be an admin to access');
      }
    }

    // Set database if (this will likely not be obvious)
    const dbId = user.photoURL;

    await dispatch(setUser(user.uid, dbId, email, userType));
    return dispatch(setStatus('success', 'Logged in baby!'));
  } catch (error) {
    dispatch(setStatus('error', error.message));
    dispatch(setUserField({ error: error.message }));
    throw error;
  }
};

/**
 * Sings out the logged in user and alters the
 * store
 *
 * - Loading
 * - checks if signed in
 * - logs out
 * - clears store
 * - success message
 *
 * - if not logged in clear store and error
 *
 * @returns {Function}
 */
export const userSignOut = () => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    if (!Firebase.auth().currentUser) throw new Error("User wasn't signed in");
    await Firebase.auth().signOut();
    dispatch(resetUser());
    return dispatch(setStatus('success', 'Bye Bye! Signed Out okay'));
  } catch (error) {
    dispatch(resetUser());
    // Same result even if error so don't throw error
    return dispatch(setStatus('error', error.message));
  }
};
