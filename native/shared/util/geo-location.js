import getDirections from 'react-native-google-maps-directions';

/**
 * Opens up google maps and gives the user directions
 * to walk to the coordinates given
 *
 * @param coordinates
 */
export const goToLocation = coordinates => {
  getDirections({
    destination: { longitude: coordinates[0], latitude: coordinates[1] },
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
