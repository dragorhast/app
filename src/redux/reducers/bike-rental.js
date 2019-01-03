export const initialState = {
  bikeID: null,
  rentalStartTime: null,
  rentalEndTime: null,
  costOfRentalSoFar: null,
  rentalActive: null,
  pickUpPoint: null,
  dropOffPoint: null,
  withinPickUpPointGeo: null,
  ableToBeReturned: null,
};

export default function bikeRentalReducer(state = initialState, { type, data }) {
  switch (type) {
    case 'RENTAL_FETCH':
      return {
        ...state,
        bikeID: data.bikeID,
        rentalStartTime: null,
        costOfRentalSoFar: null,
        rentalActive: null,
        pickUpPoint: null,
        withinPickUpPointGeo: null,
        ableToBeReturned: null,
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
        ...state,
        costOfRentalSoFar: data.totalPrice,
        rentalEndTime: data.rentalEndTime,
        dropOffPoint: data.dropOffPoint,
        rentalActive: false,
      };
    case 'RENTAL_RESET':
      return initialState;
    default:
      return state;
  }
}
