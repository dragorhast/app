/**
 * All redux information related to locale
 * @type {string}
 */

// Actions
const LOCALE_REPLACE = 'LOCALE_REPLACE';

// Reducer
const INITIAL_STATE = {
  country: 'en',
};

export default function localeReducer(state = INITIAL_STATE, { type, locale }) {
  switch (type) {
    case LOCALE_REPLACE: {
      if (locale) {
        return {
          country: locale,
        };
      }
      return INITIAL_STATE;
    }
    default:
      return state;
  }
}

// Action Creators
export function replaceLocale(locale) {
  return { type: LOCALE_REPLACE, locale };
}

