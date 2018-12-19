/**
 * Actions for everything related to renting a bike
 */
import statusMessage from './status';

/**
 * Attempts to rent a bike using the ID code obtained from either the
 * QR scanner or from the user typing the code in to the app
 *
 * Passes the bike ID and the required user ID things off to the
 * server.
 *
 * Note: A HTTP ERROR LIKE 404 WITH BE SUCCESSFUL RESPONSE FROM API
 *
 * success = sets the correct info in state + status state
 * failure = set the status in state and throw error to be handled down line
 *
 *
 * Should only hit the api once every 2 seconds
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

      // CALL THE API
      const result = await fetch(`/bike/startRental/${bikeID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firebaseUID }),
      });

      // ****** TEST RESULTS *******
      // Test Pass
      // const result = {
      //   data: {
      //     bikeID: '12345678910',
      //     rentalStartTime: new Date(),
      //   },
      // };
      // Test Fail
      // const result = { error: 'Error here' };

      // HTTP ERROR - message decided on server
      if (result.error) {
        // gets caught by .catch()
        return reject({ message: result.error });
      }

      // SUCCESSFUL HTTP RESULT
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
      // LOADING
      // Don't bother telling Redux fetching, just use what's already there
      console.log('RELOADING DATA');
      await statusMessage(dispatch, 'loading', true);

      // Get ID from state
      const firebaseUID = getState().member.uid; // presume can only be accessed if logged in

      // CALL THE API
      const result = await fetch(`/user/currentRental/${firebaseUID}`);

      // ****** TEST RESULTS *******
      // Test Pass
      // const result = {
      //   data: {
      //     bikeID: '12345678910',
      //     rentalStartTime: new Date(),
      //     costOfRentalSoFar: 200,
      //     rentalActive: true,
      //   },
      // };
      // Test Fail
      // const result = { error: 'Error here' };

      // HTTP ERROR - message decided on server
      if (result.error) {
        // gets caught by .catch()
        return reject({ message: result.error });
      }

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
