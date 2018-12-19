export const initialState = {
  bikeID: null,
  rentalStartTime: null,
  costOfRentalSoFar: null,
  rentalActive: null,
  twoSecondWait: false,
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
      };
    case 'RENTAL_SET_DATA':
      return {
        ...state,
        bikeID: data.bikeID,
        rentalStartTime: data.rentalStartTime, // TODO check if needs converted
        costOfRentalSoFar: data.costOfRentalSoFar,
        rentalActive: true,
      };
    case 'RENTAL_END':
      return {
        ...state,
        costOfRentalSoFar: data.costOfRentalSoFar,
        rentalActive: false,
      };
    case 'RENTAL_ABORT':
      return initialState;
    case 'RENTAL_2_SECOND_API_WAIT':
      return {
        ...state,
        twoSecondWait: data,
      };
    default:
      return state;
  }
}
