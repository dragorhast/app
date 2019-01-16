/**
 * Returns the time of a date in the format
 * hours:minutes
 *
 * Makes sure that minutes of 0-9 have a 0 infront of them
 * @param date
 * @returns {string}
 */
export default date =>
  `${date.getHours()}:${date
    .getMinutes()
    .toString()
    .replace(/^(\d)$/, '0$1')}`;
