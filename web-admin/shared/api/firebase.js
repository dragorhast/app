/**
 * Api endpoints for firebase to be called
 * from actions or anywhere firebase is needed.
 *
 * Easily testable if here
 */
import { Firebase, FirebaseRef } from '../constants/firebase';

export const firebaseSignUpEmail = async (email, password) => {
  try {
    const result = await Firebase.auth().createUserWithEmailAndPassword(email, password);
    const firebaseAuthToken = await result.user.getIdToken();
    return {
      uid: result.user.uid,
      authToken: firebaseAuthToken,
    };
  } catch (e) {
    throw e;
  }
};

export const firebaseLoginEmail = async (email, password) => {
  try {
    const result = await Firebase.auth().signInWithEmailAndPassword(email, password);
    return result.user;
  } catch (e) {
    throw e;
  }
};

/**
 * Updates the firebase profile with the user's id and name
 *
 * @param id
 * @param name
 * @returns {Promise<void>}
 */
export const firebaseUpdateProfile = ({ id, name }) =>
  Firebase.auth().currentUser.updateProfile({
    displayName: name,
    photoURL: id,
  });
