import { Firebase } from '../../constants/firebase';
import { firebaseSignUpEmail, firebaseLoginEmail } from '../firebase';

describe('firebase sign up user using e-mail', () => {
  const email = 'jest-test@test.com';
  // remember pass in done
  it('Signs up the user + then delete them', async done => {
    try {
      const user = await firebaseSignUpEmail(email, 'Password');
      // Gets from SDK
      const userIDFromConsole = Firebase.auth().currentUser.uid;
      expect(userIDFromConsole).toBe(user.uid);

      // Delete user
      await Firebase.auth().currentUser.delete();
      // await FirebaseAdmin.auth().deleteUser(user.uid);
      done();
    } catch (e) {
      await Firebase.auth().currentUser.delete(); // Still tries to delete even if fails
      console.log(e);
      done.fail(e);
    }
  });

  it('Error saying user already exists if sign up twice', async done => {
    // First SignUp
    let uid;
    try {
      await firebaseSignUpEmail(email, 'Password');
    } catch (e) {
      // Errored on first sign up
      done.fail();
    }
    // Second attempt at SignUp
    try {
      await firebaseSignUpEmail(email, 'Password');
      // shouldn't pass like its okay
      done.fail();
    } catch (e) {
      // Attempt delete
      try {
        await Firebase.auth().currentUser.delete();
        expect(e.code).toBe('auth/email-already-in-use');
        done();
      } catch (e2) {
        // Couldn't delete
        done.fail();
      }
    }
  });
});

describe('firebase login user using e-mail', () => {
  const email = 'jest-test@test.com';
  const password = 'Password';
  let signUpUid;

  it('Creates user then signs out', async done => {
    try {
      // SignUp
      const signUp = await firebaseSignUpEmail(email, password);
      signUpUid = signUp.uid;
      // signOut
      await Firebase.auth().signOut();
      done();
    } catch (e) {
      console.error(e);
      done.fail(e);
    }
  });

  it('Signs in user that has just been created', async done => {
    try {
      // Login
      await firebaseLoginEmail(email, password);
      const currentUser = Firebase.auth().currentUser;

      // Ensures same uid
      expect(Firebase.auth().currentUser.uid).toBe(signUpUid);

      // Deletes
      await Firebase.auth().currentUser.delete();

      const userDebug = currentUser;
      done();
    } catch (e) {
      await Firebase.auth().currentUser.delete();
      console.error(e);
      done.fail();
    }
  });
});
