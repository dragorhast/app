import { setStatus } from './status';
import { apiIssueCreate } from '../../api/tap2go';
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

    const issue = await apiIssueCreate({ bikeId, description });

    return dispatch(setStatus('success', 'Issues reported. Sorry about that!'));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};
