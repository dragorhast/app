export const INITIAL_STATE = {
  bikeID: null,
  rentalStartTime: null,
  rentalEndTime: null,
  costOfRentalSoFar: null,
  rentalActive: null,
  pickUpPoint: null,
  dropOffPoint: null,
  withinPickUpPointGeo: null,
  ableToBeReturned: null,
  lastCostChargedToCard: null, // TODO decide if this could be handled better
};

export default function bikeRentalReducer(state = INITIAL_STATE, { type, data }) {
  switch (type) {
    case 'RENTAL_FETCH':
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
        ableToBeReturned: data.ableToBeReturned,
      };
    case 'RENTAL_END':
      return {
        bikeID: null,
        rentalStartTime: null,
        rentalEndTime: null, // TODO is this needed?
        costOfRentalSoFar: null,
        rentalActive: null,
        pickUpPoint: null,
        dropOffPoint: null, // TODO is this needed?
        withinPickUpPointGeo: null,
        ableToBeReturned: null,
        lastCostChargedToCard: data.costChargedToCard,
      };
    case 'RENTAL_RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}
