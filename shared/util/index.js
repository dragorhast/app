export const delay = async time => {
  await setTimeout(() => {}, time);
};

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
