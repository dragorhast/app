import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Content } from 'native-base';
import { Alert } from 'react-native';
import { ScrollableScreen } from '../styles';
import ReservationCard from '../components/ReservationCard';
import ROUTES from '../routes';
import withReservationDisplay, {
  ReservationDisplayProps,
} from '../../shared/redux/containers/ReservationDisplayContainer';
import { prettyDateTime } from '../../shared/util';

class ReservationsUpcoming extends Component {
  componentWillMount() {
    const { fetchReservations } = this.props;
    fetchReservations();
  }

  goToFullReservationPage = async reservation => {
    const { setSingleReservationDisplay } = this.props;
    await setSingleReservationDisplay(reservation);
    Actions[ROUTES.ReservationDisplayWithBack]();
  };

  reservationConfirmCancel = ({ id, pickupName, datetime }) => {
    const { cancelReservation } = this.props;
    Alert.alert(
      'Are you sure you want to cancel',
      `Reservation at ${pickupName} at ${prettyDateTime(datetime)}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => cancelReservation(id) },
      ],
      { cancelable: true }
    );
  };

  render() {
    const { reserveDisplay } = this.props;
    return (
      <Container>
        <Content>
          <ScrollableScreen>
            {reserveDisplay.list &&
              reserveDisplay.list.map(reservation => (
                <ReservationCard
                  reservation={reservation}
                  cancelReservation={this.reservationConfirmCancel}
                  viewFullReservation={this.goToFullReservationPage}
                  key={reservation.reservationId}
                />
              ))}
          </ScrollableScreen>
        </Content>
      </Container>
    );
  }
}

ReservationsUpcoming.propTypes = {
  ...ReservationDisplayProps,
};

export default withReservationDisplay(ReservationsUpcoming);
