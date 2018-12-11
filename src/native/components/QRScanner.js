import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';

/**
 * Component that render QR scanner or a message that camera
 * permission is needed
 *
 */
export default class QRScanner extends React.Component {
  static propTypes = {
    onSuccessfulScan: PropTypes.func.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
  };

  static defaultProps = {
    height: 300,
    width: '100%',
  };

  // Does this persist?
  state = {
    hasCameraPermission: null,
  };

  async componentDidMount() {
    // Does this persist?
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  render() {
    const { hasCameraPermission } = this.state;
    const { onSuccessfulScan, height, width } = this.props;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
        {hasCameraPermission === null && <Text>Requesting for camera permission</Text>}
        {hasCameraPermission === false && <Text>No access to camera</Text>}
        {hasCameraPermission && <BarCodeScanner onBarCodeRead={() => onSuccessfulScan()} style={{ height, width }} />}
      </View>
    );
  }
}
