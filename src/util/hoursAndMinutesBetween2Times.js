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
export default (startTime, endTime) => {
  const milliSecondsSoFar = endTime - new Date(startTime);
  const hours = Math.floor(milliSecondsSoFar / (1000 * 60 * 60));
  const minutes = Math.round((milliSecondsSoFar / 1000) % 60);
  return hours ? `${hours} hrs ${minutes} mins` : `${minutes} mins`;
};
