import React from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { H2, Text, View, Button, Icon, H3 } from 'native-base';
import { Screen, CardMediumShadow, StyledInline } from '../styles';
import Spacer from '../components/Spacer';
import ROUTES from '../routes';
import withReservationDisplay, {
  ReservationDisplayProps,
} from '../../shared/redux/containers/ReservationDisplayContainer';
import { goToLocation } from '../../shared/util/geo-location';

class ReservationDisplay extends React.PureComponent {
  cancelReservation = () => {
    const { cancelReservation, reserveDisplay } = this.props;
    cancelReservation(reserveDisplay.id);
    Actions[ROUTES.Home]();
  };

  cancelReservationAlert = () => {
    // Works on both iOS and Android
    Alert.alert(
      'Are you sure you want to cancel?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => this.cancelReservation() },
      ],
      { cancelable: true }
    );
  };

  loadUnlockBikeScreen = () => {
    Actions[ROUTES.RentalStart]();
  };

  render() {
    const { reserveDisplay } = this.props;
    const date = new Date(reserveDisplay.datetime);

    return (
      <Screen>
        <CardMediumShadow>
          {/* Top Text about the reservation */}
          <View style={{ height: 128, justifyContent: 'space-between', marginBottom: 16 }}>
            <Text>Pickup Point</Text>
            {/* TODO add clickable link to directions */}
            <StyledInline onPress={() => console.log('Would change page')}>
              <H2 link>{reserveDisplay.pickupName}</H2>
              <Icon
                name="ios-walk"
                ios="ios-walk"
                anroid="md-walk"
                style={{ fontSize: 40, color: 'green' }}
                onPress={() => goToLocation(reserveDisplay.pickupLocation)}
              />
            </StyledInline>
            <Text>Date + Time</Text>
            <H2>
              {date.getDate()}/{date.getMonth()}/{date.getFullYear()} - {date.getHours()}:{date.getMinutes()}
            </H2>
          </View>

          <View style={{ height: 128, justifyContent: 'space-between', marginVertical: 16 }}>
            <H3 style={{ fontStyle: 'italic', textAlign: 'center' }}>
              Scan any bike at the station up to 30 minutes before to claim your reservation
            </H3>
            <Spacer size={8} />
            <Text center>We'll make sure there's a bike there for you and no one else can take it! ;)</Text>
          </View>
        </CardMediumShadow>

        <Spacer />
        {/* Buttons */}
        <View style={{ width: '60%', alignSelf: 'center' }}>
          {/* TODO only display when current location is inside coordinates */}
          <Button primary onPress={this.loadUnlockBikeScreen}>
            <Text>Claim Reservation</Text>
          </Button>
          <Button danger onPress={this.cancelReservationAlert}>
            <Text>Cancel Reservation</Text>
          </Button>
        </View>
      </Screen>
    );
  }
}

ReservationDisplay.propTypes = {
  ...ReservationDisplayProps,
};

export default withReservationDisplay(ReservationDisplay);
