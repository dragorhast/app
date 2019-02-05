import { userSignUp } from '../ducks/user';
import { Firebase } from '../../constants/firebase';
import { apiUserDelete } from '../../api/tap2go';

describe('Async Redux action to signUpUser', () => {
  const email = 'jest-test-userSignUp@test.com';
  const password = 'password';
  const firstName = 'First';
  const lastName = 'Last';
  const dispatch = fn => console.log('Dispatched: ', fn);

  it('Signs up user with email + password', async done => {
    try {
      const formData = {
        email,
        password,
        password2: password,
        firstName,
        lastName,
      };

      // Sign up the user (Firebase + Tap2Go)
      await userSignUp(formData)(dispatch);

      // Checks saved users id from tap2go in to firebase
      expect(Firebase.auth().currentUser.photoURL).toBeTruthy();

      expect(Firebase.auth().currentUser.displayName).toEqual(`${firstName} ${lastName}`);

      // Delete from firebase and tap2go
      Firebase.auth().currentUser.delete();
      const token = await Firebase.auth().currentUser.getIdToken();
      await apiUserDelete(token);
      done();
    } catch (e) {
      Firebase.auth().currentUser.delete();
      done.fail();
    }
  });
});

describe('Asunc Redux acrion to login user', () => {});
