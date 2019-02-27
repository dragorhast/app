/**
 * Reducer to hold the current status of the last action
 * to take place.
 *
 * Errors + Successes will kick off a Toast
 */

// Actions
const STATUS_SET = 'STATUS_SET';

// Reducer
const INITIAL_STATE = {
  loading: false,
  error: null,
  success: null,
};

export default function statusReducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    // resets those that aren't being set, can't have success + error
    case STATUS_SET:
      return {
        ...state,
        loading: payload.loading || false,
        error: payload.error || null,
        success: payload.success || null,
      };
    default:
      return state;
  }
}

// Action Creators
export function setStatus(type, val) {
  // Set some defaults for convenience
  let message = val;
  if (!val) {
    if (type === 'success') message = 'Success';
    if (type === 'error') message = 'Sorry, an error occurred';
    if (type === 'info') message = 'Something is happening...';
    if (type === 'loading' && val !== false) message = true;
  }

  return { type: STATUS_SET, payload: { [type]: message } };
}
