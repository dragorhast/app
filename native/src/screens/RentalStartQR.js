import React from 'react';
import { Actions } from 'react-native-router-flux';
import { H2, Item, Input, View } from 'native-base';
import styled from 'styled-components/native';
import { Screen } from '../styles';
import QRScanner from '../components/QRScanner';
import ROUTES from '../routes';
import withStartRental, { RentalStartProps } from '../../shared/redux/containers/RentalStartContainer';
import { Firebase } from '../../shared/constants/firebase';
import { apiUserAbleToMakePayment } from '../../shared/api/tap2go';

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

  /**
   * Checks user is able to pay, if not routes to payment addition page
   *
   * @param bikeId
   * @returns {Promise<void>}
   */
  sendBikeIdToServer = async bikeId => {
    const { startRental } = this.props;
    try {
      const authToken = await Firebase.auth().currentUser.getIdToken();
      const ableToPay = await apiUserAbleToMakePayment(authToken);
      if (ableToPay) {
        await startRental(bikeId);
        Actions[ROUTES.RentalInfoNew]();
      } else {
        Actions.replace(ROUTES.PaymentRequired, {
          callbackOnSuccessfulPaymentUpload: () => Actions.replace(ROUTES.RentalStart),
        });
      }
    } catch (e) {
      return Promise.resolve();
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
