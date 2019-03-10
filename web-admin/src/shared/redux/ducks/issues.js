import PropTypes from 'prop-types';
import _ from 'lodash';
import { setStatus } from './status';
import { apiIssueCreate, apiIssuesFetch, apiIssueFetchSingle } from '../../api/tap2go';
import { Firebase } from '../../constants/firebase';

// Prop Types
export const IssueSinglePropTypes = {
  id: PropTypes.number,
  type: PropTypes.string,
  bikeId: PropTypes.string,
  userId: PropTypes.number,
  status: PropTypes.string,
  datetime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  desc: PropTypes.string,
};

// Initial State
const INITIAL_STATE = {
  statusFilter: 'asc',
  typeFilter: 'asc',
  timeFilter: 'asc',
  issuesList: [],
  issueSingle: {
    id: '',
    type: '',
    bikeId: '',
    userId: '',
    status: '',
    datetime: null,
    desc: '',
  },
};

// Actions
const ISSUES_SET_LIST = 'ISSUES_SET_LIST';
const ISSUES_SET_SINGLE = 'ISSUES_SET_SINGLE';
const ISSUES_FILTER_SET = 'ISSUES_FILTER_SET';

// Reducer
export default function issueReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case ISSUES_SET_LIST:
      return {
        ...state,
        issuesList: payload,
      };
    case ISSUES_SET_SINGLE:
      return {
        ...state,
        issueSingle: payload,
      };
    case ISSUES_FILTER_SET:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
}

// Action Creators
export const setIssuesStatusOrderAsc = boolean => ({
  type: ISSUES_FILTER_SET,
  payload: {
    statusFilter: boolean ? 'asc' : 'desc',
  },
});

export const setIssuesTypeOrderAsc = boolean => ({
  type: ISSUES_FILTER_SET,
  payload: {
    typeFilter: boolean ? 'asc' : 'desc',
  },
});

export const setIssuesTimeOrderAsc = boolean => ({
  type: ISSUES_FILTER_SET,
  payload: {
    timeFilter: boolean ? 'asc' : 'desc',
  },
});

const setIssueList = issues => ({
  type: ISSUES_SET_LIST,
  payload: issues,
});

export const setSingleIssueDisplay = ({ id, type, bikeId, userId, status, datetime, description }) => ({
  type: ISSUES_SET_SINGLE,
  payload: { id, type, bikeId, userId, status, datetime, description },
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

    await dispatch(setIssueList(getRawIssuesDataReady(issuesRaw)));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    console.log(e);
    dispatch(setStatus('error', 'Unable to get issues'));
    return Promise.resolve();
  }
};

export const issueFetchSingle = issueId => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();
    const issue = await apiIssueFetchSingle(authToken, issueId);

    await dispatch(setSingleIssueDisplay(getSingleRawIssueDataReady(issue)));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    dispatch('error', e.message);
    return Promise.resolve();
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
    return Promise.resolve();
  }
};

// Selectors
export const getIssuesWithFilter = (issues, statusFilter, typeFilter, timeFilter) =>
  _.orderBy(issues, ['status', 'type', 'datetime'], [statusFilter, typeFilter, timeFilter]);

// ****** Helper Functions ***** //
export const getRawIssuesDataReady = issuesRaw => issuesRaw.map(issue => getSingleRawIssueDataReady(issue));

export const getSingleRawIssueDataReady = issue => ({
  id: issue.id,
  type: issue.bike_identifier ? 'Bike' : 'App',
  bikeId: issue.bike_identifier || '',
  userId: issue.user_id,
  status: 'Open', // TODO change api as only ever open
  datetime: issue.time,
  description: issue.description,
});
