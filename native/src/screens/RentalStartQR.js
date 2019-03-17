import React from 'react';
import { Actions } from 'react-native-router-flux';
import { H2, Item, Input, View, Button, Text, Fab, Icon } from 'native-base';
import styled from 'styled-components/native';
import { Screen } from '../styles';
import QRScanner from '../components/QRScanner';
import ROUTES from '../routes';
import withStartRental, { RentalStartProps } from '../../shared/redux/containers/RentalStartContainer';
import { Firebase } from '../../shared/constants/firebase';
import { apiUserAbleToMakePayment } from '../../shared/api/tap2go';
import THEME from '../styles/styledComponentTheme';

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
    const { closestBike } = this.props;

    return (
      <Screen style={{ justifyContent: 'flex-end' }}>
        <Fab
          active={false}
          style={{ backgroundColor: THEME.primary, zIndex: 99 }}
          position="topRight"
          onPress={() => Actions[ROUTES.MapWithBikes]()}
        >
          <Icon name="ios-map" />
        </Fab>
        <View style={{ height: '60%', width: '90%' }}>
          <SQrScanner>
            <QRScanner onSuccessfulScan={this.sendBikeIdToServer} />
          </SQrScanner>
          <View style={{ width: 144, alignSelf: 'center' }}>
            <Item>
              <Input
                placeholder="Bike ID"
                value={bikeIdInput}
                onChangeText={input => this.setState({ bikeIdInput: input })}
                returnKeyType="go"
                onSubmitEditing={() => this.sendBikeIdToServer(bikeIdInput)}
                maxLength={6}
              />
            </Item>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginVertical: 32 }}>
          <Button large primary block onPress={closestBike}>
            <Text>Closest</Text>
          </Button>

          <Button large light block onPress={() => Actions[ROUTES.PickupPoints]()}>
            <Text>Reserve</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

RentalStartQR.propTypes = {
  ...RentalStartProps,
};

export default withStartRental(RentalStartQR);
