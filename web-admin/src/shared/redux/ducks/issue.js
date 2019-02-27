import { setStatus } from './status';
import { apiIssueCreate } from '../../api/tap2go';
import { Firebase } from '../../constants/firebase';
// Actions

// Initial State

// Reducer

// Action Creators

// Async Calls

export const issueReport = ({ bikeId, description }) => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    // Ensure description, bikeId not needed
    if (!description) throw new Error('Issues must have a valid description');

    const authToken = await Firebase.auth().currentUser.getIdToken();

    console.log('Bike id: ', bikeId, ' description: ', description);
    const data = bikeId ? { bike_identifier: bikeId, description } : { description };

    await apiIssueCreate(authToken, data);

    return dispatch(setStatus('success', 'Issues reported. Sorry about that!'));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};
