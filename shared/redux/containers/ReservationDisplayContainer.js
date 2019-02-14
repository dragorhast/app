/**
 * Higher Order Component used for displaying a reservation
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  reservationCancel,
  reservationsFetchForUser,
  setSingleReservationDisplay,
  ReservationDisplayPropTypes,
} from '../ducks/reservationDisplay';

export const ReservationDisplayProps = {
  locale: PropTypes.string.isRequired,
  reserveDisplay: PropTypes.shape({
    ...ReservationDisplayPropTypes,
  }).isRequired,
  cancelReservation: PropTypes.func.isRequired,
  fetchUsersReservations: PropTypes.func.isRequired,
  setSingleReservationDisplay: PropTypes.func.isRequired,
};

export default function withReservationDisplay(WrappedComponent) {
  class ReservationDisplayContainer extends React.PureComponent {
    render() {
      const {
        locale,
        reserveDisplay,
        cancelReservation,
        fetchUsersReservations,
        setSingleReservationDisplay,
        ...restProps
      } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          reserveDisplay={reserveDisplay}
          cancelReservation={cancelReservation}
          fetchUsersReservations={fetchUsersReservations}
          setSingleReservationDisplay={setSingleReservationDisplay}
          {...restProps} // passes any other through
        />
      );
    }
  }

  ReservationDisplayContainer.propTypes = {
    ...ReservationDisplayProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    reserveDisplay: state.reserveDisplay,
  });

  const mapDispatchToProp = {
    cancelReservation: reservationCancel,
    fetchUsersReservations: reservationsFetchForUser,
    setSingleReservationDisplay,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(ReservationDisplayContainer);
}
