import React from 'react';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { H2, Text, View, Button, Icon } from 'native-base';
import { Screen, CardMediumShadow, BreakLine, StyledInline } from '../styles';
import Spacer from '../components/Spacer';
import ROUTES from '../routes';
import withReservationDisplay, {
  ReservationDisplayProps,
} from '../../shared/redux/containers/ReservationDisplayContainer';

class ReservationDisplay extends React.PureComponent {
  cancelReservation = () => {
    const { cancelReservation, reserveDisplay } = this.props;
    cancelReservation(reserveDisplay.id);
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
              <Icon name="ios-walk" ios="ios-walk" anroid="md-walk" style={{ fontSize: 40, color: 'green' }} />
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
            <Button large danger bordered onPress={this.cancelReservation}>
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
