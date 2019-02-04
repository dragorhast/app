import { userSignUp } from '../ducks/user';
import { Firebase } from '../../constants/firebase';

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

      await userSignUp(formData)(dispatch);
      Firebase.auth().currentUser.delete();
      done();
    } catch (e) {
      Firebase.auth().currentUser.delete();
      done.fail();
    }
  });
});

describe('Asunc Redux acrion to login user', () => {});
