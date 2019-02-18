import React from 'react';
import { Actions } from 'react-native-router-flux';
import { H2, Item, Input, View } from 'native-base';
import styled from 'styled-components/native';
import { Screen } from '../styles';
import QRScanner from '../components/QRScanner';
import ROUTES from '../routes';
import withStartRental, { RentalStartProps } from '../../shared/redux/containers/RentalStartContainer';

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
      Actions[ROUTES.RentalInfoNew]();
    } catch (e) {
      if (e.message === 'NO PAYMENT METHOD') {
        Actions.replace(ROUTES.PaymentRequired, {
          callbackOnSuccessfulPaymentUpload: () => Actions.replace(ROUTES.RentalStart),
        });
        return;
      }
      // Actions.push(ROUTES.RentalStart);
    }
  };

  render() {
    const { bikeIdInput } = this.state;

    return (
      <Screen>
        <H2>Scan QR or type in 6 Digit code</H2>
        <View style={{ height: '80%', width: '90%' }}>
          <Item>
            <Input
              placeholder="6 Digit Bike ID"
              value={bikeIdInput}
              onChangeText={input => this.setState({ bikeIdInput: input })}
              returnKeyType="go"
              onSubmitEditing={() => this.sendBikeIdToServer(bikeIdInput)}
            />
          </Item>

          <SQrScanner>
            <QRScanner onSuccessfulScan={this.sendBikeIdToServer} />
          </SQrScanner>
        </View>
      </Screen>
    );
  }
}

RentalStartQR.propTypes = {
  ...RentalStartProps,
};

export default withStartRental(RentalStartQR);
