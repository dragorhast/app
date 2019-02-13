import React from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { H2, Text, View, Button, Icon } from 'native-base';
import { Screen, CardMediumShadow, StyledInline } from '../styles';
import Spacer from '../components/Spacer';
import ROUTES from '../routes';
import withReservationDisplay, {
  ReservationDisplayProps,
} from '../../shared/redux/containers/ReservationDisplayContainer';
import { goToLocation } from '../../shared/util';

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
        <CardMediumShadow style={{ height: '60%', width: '90%' }}>
          {/* Top Text about the reservation */}
          <View style={{ height: 128, justifyContent: 'space-between' }}>
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

          <Spacer />
          {/* Buttons */}
          <View style={{ flex: 1, width: '80%', alignSelf: 'center' }}>
            {/* TODO only display when current location is inside coordinates */}
            <Button large primary onPress={this.loadUnlockBikeScreen}>
              <Text>Unlock A Bike</Text>
            </Button>
            <Button large danger bordered onPress={this.cancelReservationAlert}>
              <Text>Cancel Reservation</Text>
            </Button>
          </View>
        </CardMediumShadow>
      </Screen>
    );
  }
}

ReservationDisplay.propTypes = {
  ...ReservationDisplayProps,
};

export default withReservationDisplay(ReservationDisplay);
