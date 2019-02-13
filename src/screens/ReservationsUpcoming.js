import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Content } from 'native-base';
import { ScrollableScreen } from '../styles';
import ReservationCard from '../components/ReservationCard';
import ROUTES from '../routes';
import withReservationDisplay, {
  ReservationDisplayProps,
} from '../../shared/redux/containers/ReservationDisplayContainer';

class ReservationsUpcoming extends Component {
  componentWillUnmount() {
    const { fetchUsersReservations } = this.props;
    fetchUsersReservations();
  }

  goToFullReservationPage = async reservation => {
    const { setSingleReservationDisplay } = this.props;
    await setSingleReservationDisplay(reservation);
    Actions[ROUTES.ReservationDisplayWithBack]();
  };

  render() {
    const { reservationsList, cancelReservation } = this.props;
    return (
      <Content>
        <ScrollableScreen>
          {reservationsList &&
            reservationsList.map(reservation => (
              <ReservationCard
                reservation={reservation}
                cancelReservation={cancelReservation}
                viewFullReservation={this.goToFullReservationPage}
                key={reservation.reservationId}
              />
            ))}
        </ScrollableScreen>
      </Content>
    );
  }
}

ReservationsUpcoming.propTypes = {
  ...ReservationDisplayProps,
};

export default withReservationDisplay(ReservationsUpcoming);
