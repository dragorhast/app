import getDirections from 'react-native-google-maps-directions';

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
