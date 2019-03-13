import PropTypes from 'prop-types';
import _ from 'lodash';
import { setStatus } from './status';
import {
  apiIssueCreate,
  apiIssuesFetch,
  apiIssueFetchSingle,
  apiIssueUpdate,
  apiBikeSingleFetch,
} from '../../api/tap2go';
import { Firebase } from '../../constants/firebase';

// Prop Types
export const IssueSinglePropTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  bikeId: PropTypes.string,
  userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  status: PropTypes.string,
  datetime: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string]),
  desc: PropTypes.string,
  bikeLocation: PropTypes.arrayOf(PropTypes.number),
};

// Initial State
const INITIAL_STATE = {
  statusFilter: 'asc',
  typeFilter: 'asc',
  timeFilter: true,
  issuesList: [],
  issueSingle: {
    id: '',
    type: '',
    bikeId: '',
    userId: '',
    status: '',
    datetime: null,
    desc: '',
    bikeLocation: null,
  },
};

// Actions
const ISSUES_SET_LIST = 'ISSUES_SET_LIST';
const ISSUES_SET_SINGLE = 'ISSUES_SET_SINGLE';
const ISSUES_FILTER_SET = 'ISSUES_FILTER_SET';
const ISSUE_SET_BIKE_LOCATION = 'ISSUE_SET_BIKE_LOCATION';

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
    case ISSUE_SET_BIKE_LOCATION:
      return {
        ...state,
        issueSingle: {
          ...state.issueSingle,
          bikeLocation: payload,
        },
      };
    default:
      return state;
  }
}

// Action Creators
export const setIssuesFilterStatusAsc = boolean => ({
  type: ISSUES_FILTER_SET,
  payload: {
    statusFilter: boolean ? 'asc' : 'desc',
  },
});

export const setIssuesFilterTypeAsc = boolean => ({
  type: ISSUES_FILTER_SET,
  payload: {
    typeFilter: boolean ? 'asc' : 'desc',
  },
});

export const setIssuesFilterTimeAsc = boolean => ({
  type: ISSUES_FILTER_SET,
  payload: {
    timeFilter: boolean,
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

const setSingleIssueBikeLocation = bikeLocation => ({
  type: ISSUE_SET_BIKE_LOCATION,
  payload: bikeLocation,
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

    const data = bikeId ? { bike_identifier: bikeId, description } : { description };

    await apiIssueCreate(authToken, data);

    return dispatch(setStatus('success', 'Issues reported. Sorry about that!'));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    return Promise.resolve();
  }
};

/**
 * Updates an  issues status
 *
 * Message is optional
 *
 * @param issueId
 * @param status
 * @param message
 * @returns {Function}
 */
export const issueUpdateStatus = (issueId, status, message) => async dispatch => {
  try {
    dispatch(setStatus('loading', true));

    const authToken = await Firebase.auth().currentUser.getIdToken();

    await apiIssueUpdate(authToken, issueId, status, message);
  } catch (e) {
    console.error(e);
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

/**
 * Gets the location of a bike that has an issue
 *
 * @param bikeIdentifier
 * @returns {Function}
 */
export const issueFetchBikeLocation = bikeIdentifier => async dispatch => {
  try {
    dispatch(setStatus('loading', true));
    const authToken = await Firebase.auth().currentUser.getIdToken();

    const bike = await apiBikeSingleFetch(authToken, bikeIdentifier);

    await dispatch(setSingleIssueBikeLocation(bike.current_location.geometry.coordinates));
    return dispatch(setStatus('loading', false));
  } catch (e) {
    dispatch(setStatus('error', e.message));
    throw e;
  }
};

// Selectors
// TODO implement this properly!! Can't get array.sort to work :-(
const sortByDatetime = (array, asc) => (asc ? array : array);
/**
 * Makes all date times a date object then orders based on filters
 * @param issues
 * @param statusFilter
 * @param typeFilter
 * @param timeFilter
 * @returns {*}
 */
export const getIssuesWithFilter = (issues, statusFilter, typeFilter, timeFilter) => {
  return _.orderBy(sortByDatetime(issues, timeFilter), ['status', 'type'], [statusFilter, typeFilter]);
};

// ****** Helper Functions ***** //
export const getRawIssuesDataReady = issuesRaw => issuesRaw.map(issue => getSingleRawIssueDataReady(issue));

export const getSingleRawIssueDataReady = issue => ({
  id: issue.id,
  type: issue.bike_identifier ? 'Bike' : 'App',
  bikeId: issue.bike_identifier || '',
  userId: issue.user_id,
  status: getPrettyStringIssue(issue.status),
  datetime: issue.time,
  description: issue.description,
  bikeLocation: null, // this is always set elsewhere
});

const getPrettyStringIssue = status => {
  switch (status) {
    case 'open':
      return 'Open';
    case 'in_review':
      return 'Review';
    case 'closed':
      return 'Closed';
    default:
      return 'No Status';
  }
};
