import { combineReducers } from 'redux';
import LocaleReducer from './locale';
import StatusReducer from './status';
import UserReducer from './user';
import RentalReducer from './rental';
import PickupPointsReducer from './pickups';
import ReservationCreationReducer from './reservationCreations';

export default combineReducers({
  locale: LocaleReducer,
  status: StatusReducer,
  user: UserReducer,
  rental: RentalReducer,
  pickups: PickupPointsReducer,
  reserveCreate: ReservationCreationReducer,
});
