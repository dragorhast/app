import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { H2, Item, Input, View } from 'native-base';
import styled from 'styled-components/native';
import { Screen } from '../styles';
import QRScanner from '../components/QRScanner';
import ROUTES from '../routes';
import withStartRental from '../../shared/redux/containers/RentalStartContainer';

const SQrScanner = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

class RentalStartQR extends React.Component {
  state = {
    bikeIdInput: '',
  };

  sendBikeIdToServer = async bikeId => {
    const { startRental } = this.props;
    try {
      await startRental(bikeId);
      // TODO change to info + find out how to pass props (fetchBikeRentalOnLoad: false)
      Actions[ROUTES.RentalInfoNew]();
    } catch (e) {
      // Re-route or open modal if no payment details
      // Error displayed as Toast through root
      return Promise.resolve();
    }
  };

  render() {
    const { bikeIdInput } = this.state;

    return (
      <Screen>
        <H2>Scan QR or type in 6 Digit code</H2>
        <View style={{ height: '80%', width: '90%' }}>
          <SQrScanner>
            <QRScanner onSuccessfulScan={this.sendBikeIdToServer} />
          </SQrScanner>
          <Item>
            <Input
              placeholder="6 Digit Bike ID"
              value={bikeIdInput}
              onChangeText={input => this.setState({ bikeIdInput: input })}
              returnKeyType="go"
              onSubmitEditing={() => this.sendBikeIdToServer(bikeIdInput)}
            />
          </Item>
        </View>
      </Screen>
    );
  }
}

RentalStartQR.propTypes = {
  startRental: PropTypes.func.isRequired,
};

export default withStartRental(RentalStartQR);