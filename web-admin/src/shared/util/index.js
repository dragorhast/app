import getDirections from 'react-native-google-maps-directions';

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

export const prettyDateTime = datetime => {
  const date = new Date(datetime);

  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};

/**
 * Opens up google maps and gives the user directions
 * to walk to the coordinates given
 *
 * @param latAndLng
 */
export const goToLocation = latAndLng => {
  getDirections({
    destination: latAndLng,
    params: [
      {
        key: 'travelmode',
        value: 'walking',
      },
      {
        key: 'dir_action',
        value: 'navigate',
      },
    ],
  });
};