import { combineReducers } from 'redux';
import LocaleReducer from './locale';
import StatusReducer from './status';
import UserReducer from './user';

export default combineReducers({
  locale: LocaleReducer,
  status: StatusReducer,
  user: UserReducer,
});
