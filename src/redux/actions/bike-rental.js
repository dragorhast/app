/**
 * Actions for everything related to renting a bike
 */
import ERROR_MESSAGE from '../../constants/errors';
import { checkJSendStatus } from './util';
import statusMessage from './status';

/*
* Note:
* A HTTP ERROR LIKE 404 is regarded as a succesfull response as far as
* fetch is concerned
* success (fetch) = checks the JSend status then acts accordingly
* failure (fetch) = set the status in state and throw error to be handled down line
*/

/**
 * Attempts to rent a bike using the ID code obtained from either the
 * QR scanner or from the user typing the code in to the app
 *
 * Passes the bike ID and the required user ID things off to the
 * server.
 *
 */
export function startRentalFromId(bikeID) {
  // returns a function that gives a promise
  return (dispatch, getState) =>
    new Promise(async (resolve, reject) => {
      // LOADING
      dispatch({ type: 'RENTAL_FETCH', data: { bikeID } });
      await statusMessage(dispatch, 'loading', true);

      // Get ID from state
      const firebaseUID = getState().member.uid; // presume can only be accessed if logged in
      if (!firebaseUID) return reject({ message: ERROR_MESSAGE.mustBeSignedIn });

      // CALL THE API
      // const result = await fetch(`/users/me/rentals`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'TapToGo-Auth': firebaseUID,
      //   },
      //   body: JSON.stringify({ bikeID }),
      // });

      // ****** TEST RESULTS *******
      // Test Pass
      const result = {
        status: 'SUCCESS',
        data: {
          bikeID: '12345678910',
          rentalStartTime: new Date(),
          pickUpPoint: 'Princess Street West',
          withinPickUpPointGeo: true,
          ableToBeReturned: true,
        },
      };
      // Test Error
      // const result = {
      //   status: 'ERROR',
      //   message: 'Error here',
      // };
      // Test Fail
      // const result = {
      //   status: 'FAIL',
      //   data: { message: 'Fail here' },
      // };

      // Rejects if JSens status of Fail or Error
      console.log(checkJSendStatus(result));
      const { message } = checkJSendStatus(result);
      if (message) return reject({ message });

      console.log(message);

      // SUCCESSFUL HTTP + JSend RESULT
      const r = result.data;
      // sets data based on response
      await statusMessage(dispatch, 'loading', false);
      return resolve(
        dispatch({
          type: 'RENTAL_SET_DATA',
          data: {
            bikeID: r.bikeID,
            rentalStartTime: r.rentalStartTime,
            costOfRentalSoFar: 0.0,
          },
        })
      );
    }).catch(async err => {
      await statusMessage(dispatch, 'loading', false);
      // dispatch({ type: 'ERROR_SET', data: err }); // TODO make error storage
      dispatch({ type: 'RENTAL_ABORT' });
      throw err.message;
    });
}

/**
 * Fetches up to date information about the users current rental
 */
export function fetchRentalInfo() {
  return (dispatch, getState) =>
    new Promise(async (resolve, reject) => {
      console.log('Reload data');
      // LOADING
      await statusMessage(dispatch, 'loading', true);
      // Get ID from state
      const firebaseUID = getState().member.uid; // presume can only be accessed if logged in
      if (!firebaseUID) return reject({ message: ERROR_MESSAGE.mustBeSignedIn });

      // Get the bike ID - to be used on server if multiple rental to one person
      const { bikeID } = getState().bikeRental;
      // if (!bikeID) return reject({ message: 'No current rental' });

      // CALL THE API
      // const result = await fetch(`/users/me/rentals`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'TapToGo-Auth': firebaseUID,
      //   },
      //   body: JSON.stringify({ bikeID }),
      // });

      // ****** TEST RESULTS *******
      // Test Pass
      const result = {
        data: {
          bikeID: '12345678910',
          rentalStartTime: new Date(),
          costOfRentalSoFar: 200,
          rentalActive: true,
          pickUpPoint: 'Princess Street West',
          withinPickUpPointGeo: true,
          ableToBeReturned: true,
        },
      };
      // Test Error
      // const result = {
      //   status: 'ERROR',
      //   message: 'Error here',
      // };
      // Test Fail
      // const result = {
      //   status: 'FAIL',
      //   data: { message: 'Fail here' },
      // };

      // Rejects if JSens status of Fail or Error
      const { message } = checkJSendStatus(result);
      if (message) return reject({ message });

      // SUCCESSFUL HTTP RESULT
      const r = result.data;
      await statusMessage(dispatch, 'loading', false);
      return resolve(
        dispatch({
          type: 'RENTAL_SET_DATA',
          data: {
            bikeID: r.bikeID,
            rentalStartTime: r.rentalStartTime,
            costOfRentalSoFar: r.costOfRentalSoFar,
          },
        })
      );
    }).catch(async err => {
      await statusMessage(dispatch, 'loading', false);
      // dispatch({ type: 'ERROR_SET', data: err }); // TODO make error storage
      throw err.message;
    });
}

/**
 * Ends the current rental
 */
