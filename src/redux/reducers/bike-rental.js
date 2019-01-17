import PropTypes from 'prop-types';

export const INITIAL_STATE = {
  bikeID: null,
  rentalStartTime: null,
  costOfRentalSoFar: null,
  rentalActive: null,
  pickUpPoint: null,
  withinPickUpPointGeo: null,
  ableToBeReturned: null,
};

export const BikeRentalPropTypes = {
  bikeID: PropTypes.string,
  rentalStartTime: PropTypes.date,
  costOfRentalSoFar: PropTypes.number,
  rentalActive: PropTypes.bool,
  pickUpPoint: PropTypes.string,
  withinPickUpPointGeo: PropTypes.bool,
  ableToBeReturned: PropTypes.bool,
};

export default function bikeRentalReducer(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'RENTAL_START_FETCH_CREATE':
      return {
        ...INITIAL_STATE,
        bikeID: data.bikeID,
      };
    case 'RENTAL_SET_DATA':
      return {
        ...state,
        bikeID: data.bikeID,
        rentalStartTime: data.rentalStartTime, // TODO check if needs converted
        costOfRentalSoFar: data.costOfRentalSoFar,
        rentalActive: true,
        pickUpPoint: data.pickUpPoint,
        withinPickUpPointGeo: data.withinPickUpPointGeo,
        ableToBeReturned: data.ableToBeReturned, // Later in dev this will always be true
      };
    case 'RENTAL_RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}
