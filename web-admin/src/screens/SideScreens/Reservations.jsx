import React from 'react';
import PropTypes from 'prop-types';
import withReservations, { ReservationDisplayProps } from '../../shared/redux/containers/ReservationDisplayContainer';
import ReservationList from '../../components/ReservationsList';
import { SSideComponent } from '../../styles/components/SidePanelSections';

class Reservations extends React.PureComponent {
  componentWillMount() {
    const { fetchReservations } = this.props;
    const admin = true;
    fetchReservations(admin);
    this.selectReservation = this.selectReservation.bind(this);
  }

  /**
   * Sets display pickup in redux then
   * re-routes to single page display
   *
   * @param reservation
   * @returns {Promise<void>}
   */
  selectReservation = async reservation => {
    const { setSingleReservationDisplay, history } = this.props;
    await setSingleReservationDisplay({ ...reservation });
    history.push(`/reservations/single/${reservation.reservationId}`);
  };

  render() {
    const { reservations } = this.props;
    return (
      <SSideComponent>
        <ReservationList reservations={reservations} selectReservation={this.selectReservation} />
      </SSideComponent>
    );
  }
}

Reservations.propTypes = {
  ...ReservationDisplayProps,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withReservations(Reservations);
