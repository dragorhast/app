import Capitalize from 'capitalize';

/**
 * Forces a time delay if called with await
 * inside an async function
 *
 * @param time
 * @returns {Promise<any>}
 */
export const delay = time =>
  new Promise(res => {
    setTimeout(() => {
      res();
    }, time);
  });

/**
 * Returns the time of a date in the format
 * hours:minutes
 *
 * Makes sure that minutes of 0-9 have a 0 infront of them
 * @param date
 * @returns {string}
 */
export const timeFromDate = date =>
  `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .replace(/^(\d)$/, '0$1')}`;

/**
 * Calculates the minutes and hours between 2 times. If there are any hours
 * then returns in format:
 * x hrs y mins
 *
 * if no hours (<60 minutes) then returns in format:
 * y mins
 *
 * @param startTime
 * @param endTime
 * @returns hours and minutes been renting for in pretty format
 */
export const hoursAndMinutesBetween2Times = (startTime, endTime) => {
  const milliSecondsSoFar = endTime - new Date(startTime);
  const hours = Math.floor(milliSecondsSoFar / (1000 * 60 * 60));
  const minutes = Math.round((milliSecondsSoFar / 1000) % 60);
  return hours ? `${hours} hrs ${minutes} mins` : `${minutes} mins`;
};

export const minutesSinceTime = startTime => {
  const differenceMs = Math.abs(new Date() - new Date(startTime));
  return Math.round(differenceMs / (1000 * 60));
};

/**
 * Returns datetime string in format
 * dd/mm/yyyy - hh:mm
 * @param datetime
 * @returns {string}
 */
export const prettyDateTime = datetime => {
  const date = new Date(datetime);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};

/**
 * Used for bike locations.
 * Gets either
 * - current pickup point
 * - String of coordinates
 *
 * @param location
 * @returns string - pretty printed
 */
export const pickupPointOrPrettyPrintCoords = location =>
  (location.features && location.features.pickup) ||
  `${location.geometry.coordinates[0].toFixed(2)}, ${location.geometry.coordinates[1].toFixed(2)}`;

/**
 * Returns a proper readable string based on
 * the status given from the api
 *
 * @param status
 * @returns {*}
 */
export const bikeStatusFromString = status => {
  switch (status) {
    case 'available' || 'broken' || 'rented':
      return Capitalize(status);
    case 'needs_serviced':
      return 'Needs Serviced';
    case 'out_of_circulation':
      return 'Out of Circ';
    default:
      throw new Error('Status unknown');
  }
};

/**
 * Based on the number of bikes at a
 * pickup point decided status
 *
 * @param bikeArray
 * @returns {string}
 */
export const pickupStateFromBikeCount = bikeArray => {
  switch (bikeArray.length) {
    case bikeArray < 5:
      return 'Low';
    case bikeArray < 12:
      return 'Medium';

    case bikeArray >= 12:
      return 'High';
    default:
      return 'Unknown';
  }
};
