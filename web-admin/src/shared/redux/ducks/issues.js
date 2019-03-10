import PropTypes from 'prop-types';
import { setStatus } from './status';
import { apiIssueCreate, apiIssuesFetch } from '../../api/tap2go';
import { Firebase } from '../../constants/firebase';

// Prop Types
export const IssueSinglePropTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.string,
  datetime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
};

// Initial State
const INITIAL_STATE = {
  issuesList: [],
  issueSingle: {
    id: '',
    type: '',
    status: '',
    datetime: null,
  },
};

// Actions
const ISSUES_SET_LIST = 'ISSUES_SET_LIST';

// Reducer
export default function issueReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ISSUES_SET_LIST:
      return {
        ...state,
        issuesList: payload,
      };
    default:
      return state;
  }
}

// Action Creators
const setIssueList = issues => ({
  type: ISSUES_SET_LIST,
  payload: issues,
});

// Thunks
/**
 * Fetch all open issues
 *
 * Must be admin to access
 *
 * @returns {Function}
 */
export const issuesFetch = () => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const issuesRaw = await apiIssuesFetch(authToken);

    console.log(getRawIssuesDataReady(issuesRaw));

    await dispatch(setIssueList(getRawIssuesDataReady(issuesRaw)));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    console.log(e);
    dispatch(setStatus('error', 'Unable to get issues'));
  }
};

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

// ****** Helper Functions ***** //
export const getRawIssuesDataReady = issuesRaw =>
  issuesRaw.map(issue => ({
    id: issue.id,
    type: issue.bike_identifier ? 'Bike' : 'App',
    status: 'Open', // TODO change api as only ever open
    datetime: issue.time,
  }));
