import { combineReducers } from 'redux';
import LocaleReducer from './locale';
import StatusReducer from './status';
import UserReducer from './user';
import RentalReducer from './rental';
import PickupPointsReducer from './pickups';
import PickupSingleReducer from './pickupSingle';
import ReservationCreationReducer from './reservationCreations';
import ReservationDisplayReducer from './reservationDisplay';
import PaymentReducer from './payment';
import BikesReducer from './bikes';
import BikeSingleReducer from './bikeSingle';
import IssuesReducer from './issues';

export default combineReducers({
  locale: LocaleReducer,
  status: StatusReducer,
  user: UserReducer,
  rental: RentalReducer,
  pickups: PickupPointsReducer,
  pickupSingle: PickupSingleReducer,
  reserveCreate: ReservationCreationReducer,
  reserveDisplay: ReservationDisplayReducer,
  payment: PaymentReducer,
  bikes: BikesReducer,
  bikeSingle: BikeSingleReducer,
  issues: IssuesReducer,
});
