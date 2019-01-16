/**
 * Actions for everything related to renting a bike
 */
import ERROR_MESSAGE from '../../constants/errors';
import { checkJSendStatus } from './util';
import statusMessage from './status';
import { JSendStatus } from '../../constants/constants';

/*
 * Note:
 * A HTTP ERROR LIKE 404 is regarded as a successful response as far as
 * fetch is concerned
 * success (fetch) = checks the JSend status then acts accordingly
 * failure (fetch) = set the status in state and throw error to be handled down line
 */

/**
 * Rents a bike using the ID code of the bike + the
 * firebaseID passed in as Authorization header
 * (QR scanner or typed in)
 *
 */
export function startRentalFromId(bikeID) {
  return (dispatch, getState) =>
    new Promise(async (resolve, reject) => {
      // LOADING
      await statusMessage(dispatch, 'loading', true);
      // Sets bike-rental to new LOADING (presumes only 1 rental at a time)
      dispatch({ type: 'RENTAL_FETCH', data: { bikeID } });

      // Make sure signed in
      const firebaseUID = getState().member.uid;
      if (!firebaseUID) return reject({ message: ERROR_MESSAGE.mustBeSignedIn });

      // CALL THE API
      // const result = await fetch(`/bikes/${bikeID}/rentals`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${firebaseUID}`,
      //   },
      //   body: JSON.stringify({ bikeID }),
      // });

      // ****** TEST RESULTS *******
      // Test Pass
      const result = {
        status: JSendStatus.SUCCESS,
        data: {
          bike_id: '123456',
          start_time: new Date(),
          estimated_price: 0.0,
          pick_up_point: 'Princess Street West', // TODO
          current_pick_up_point: 'Princess Stress West', // TODO
        },
      };
      // Test Error
      // const result = {
      //   status: 'JSendStatus.ERROR,
      //   message: 'Error here',
      // };
      // Test Fail
      // const result = {
      //   status: 'FAIL',
      //   data: { message: 'Fail here' },
      // };

      // Rejects if JSend status of Fail or Error
      const { message } = checkJSendStatus(result);
      if (message) return reject({ message });

      // SUCCESSFUL HTTP + JSend RESULT
      const r = result.data;

      await statusMessage(dispatch, 'loading', false);

      return resolve(
        dispatch({
          type: 'RENTAL_SET_DATA',
          data: {
            bikeID: r.bike_id,
            rentalStartTime: r.start_time,
            costOfRentalSoFar: r.estimated_price,
            pickUpPoint: r.pick_up_point, // TODO change
            withinPickUpPointGeo: !!r.current_pick_up_point, // TODO change
          },
        })
      );
    }).catch(async err => {
      await statusMessage(dispatch, 'loading', false);
      await statusMessage(dispatch, 'error');
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
      await statusMessage(dispatch, 'loading', true);
      // Make sure signed in
      const firebaseUID = getState().member.uid; // presume can only be accessed if logged in
      if (!firebaseUID) return reject({ message: ERROR_MESSAGE.mustBeSignedIn });

      // Gets the bike ID - to be used on server if multiple rental to one person
      // const { bikeID } = getState().bikeRental;
      // if (!bikeID) return reject({ message: 'No current rental' });

      // CALL THE API
      // const result = await fetch(`/users/me/rentals/current`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${firebaseUID}`,
      //   },
      // });

      // ****** TEST RESULTS *******
      // Test Pass
      const result = {
        status: JSendStatus.SUCCESS,
        data: {
          bike_id: '123456',
          start_time: new Date(2019, 0, 16, 10, 0, 0),
          estimated_price: 200,
          rental_active: true, // TODO
          pick_up_point: 'Princess Street West', // TODO
          current_pick_up_point: 'Princes Street East', // TODO
        },
      };
      // Test Error
      // const result = {
      //   status: JSendStatus.ERROR,
      //   message: 'Error here',
      // };
      // Test Fail
      // const result = {
      //   status: 'FAIL',
      //   data: { message: 'Fail here' },
      // };

      // Rejects if JSend status of Fail or Error
      const { message } = checkJSendStatus(result);
      if (message) return reject({ message });

      // SUCCESSFUL HTTP + JSend RESULT
      const r = result.data;

      await statusMessage(dispatch, 'loading', false);

      return resolve(
        dispatch({
          type: 'RENTAL_SET_DATA',
          data: {
            bikeID: r.bike_id,
            rentalStartTime: r.start_time,
            costOfRentalSoFar: r.estimated_price,
            rentalActive: r.rental_active, // TODO change
            pickUpPoint: r.pick_up_point, // TODO change
            withinPickUpPointGeo: !!r.current_pick_up_point, // TODO change
          },
        })
      );
    }).catch(async err => {
      await statusMessage(dispatch, 'loading', false);
      await statusMessage(dispatch, 'error');
      throw err.message;
    });
}

/**
 * Ends the current rental
 */
export function endRental() {
  return (dispatch, getState) =>
    new Promise(async (resolve, reject) => {
      // LOADING
      await statusMessage(dispatch, 'loading', true);
      // Make sure signed in
      const firebaseUID = getState().member.uid; // presume can only be accessed if logged in
      if (!firebaseUID) return reject({ message: ERROR_MESSAGE.mustBeSignedIn });
      // make sure have active rental
      const { bikeID } = getState().bikeRental;
      if (!bikeID) return reject({ message: 'Must have active rental' });

      // call the api
      // const result = await fetch('/users/me/rentals/current', {
      //   method: 'DELETE',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${firebaseUID}`,
      //   },
      // });

      // ****** TEST RESULTS *******
      // Test Pass
      const result = {
        status: JSendStatus.SUCCESS,
        data: {
          bike_id: '123456',
          price: 200,
        },
      };

      // Test Fail
      // const result = {
      //   status: JSendStatus.FAIL,
      //   data: {
      //     message: "Ending didn't work",
      //   },
      // };

      // Stop loading then declare pass or fail
      await statusMessage(dispatch, 'loading', false);

      const { message } = checkJSendStatus(result);

      if (message) return reject({ message });
      // SUCCESSFUL HTTP + JSend RESULT

      const r = result.data;
      return resolve(
        dispatch({
          type: 'RENTAL_RESET',
          data: {
            costChargedToCard: r.price,
          },
        })
      );
    }).catch(async err => {
      await statusMessage(dispatch, 'loading', false);
      await statusMessage(dispatch, 'error');
      throw err.message;
    });
}
