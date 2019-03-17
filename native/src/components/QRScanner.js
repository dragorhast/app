/**
 * Component that render QR scanner or a message that camera
 * permission is needed
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';
import { BarCodeScanner, Permissions } from 'expo';
import { delay } from '../../shared/util';

export default class QRScanner extends React.Component {
  static propTypes = {
    onSuccessfulScan: PropTypes.func.isRequired,
  };

  state = {
    hasCameraPermission: null,
    within5SecondWaitingWindow: false,
  };

  /**
   * Sets camera permission
   */
  async componentDidMount() {
    // TODO give user info how to change permission if they've accidentally pressed no
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    // this.props.onSuccessfulScan('12345678916'); // TODO remove test
  }

  /**
   * Passes data up the ladder
   * Only allows 1 execution every 5 seconds
   *
   * @param data
   * @param type
   */
  onBarCodeRead = ({ data, type }) => {
    const { onSuccessfulScan } = this.props;
    const { within5SecondWaitingWindow } = this.state;

    if (within5SecondWaitingWindow) return;

    this.setState({ within5SecondWaitingWindow: true }, async () => {
      onSuccessfulScan(data);
      await delay(5000);
      this.setState({ within5SecondWaitingWindow: false });
    });
  };

  render() {
    const { hasCameraPermission } = this.state;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black' }}>
        {hasCameraPermission === null && <Text>Requesting for camera permission</Text>}
        {hasCameraPermission === false && <Text>No access to camera</Text>}
        {hasCameraPermission && <BarCodeScanner onBarCodeRead={this.onBarCodeRead} style={{ flex: 1 }} />}
      </View>
    );
  }
}
