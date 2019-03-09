/**
 * Higher Order Component used for displaying a reservation
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  reservationCancel,
  reservationsFetch,
  setSingleReservationDisplay,
  ReservationDisplayPropTypes,
  ReservationDisplaySingleProps,
} from '../ducks/reservationDisplay';

export const ReservationDisplayProps = {
  locale: PropTypes.string.isRequired,
  reserveDisplay: PropTypes.shape({
    ...ReservationDisplayPropTypes,
  }).isRequired,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      ...ReservationDisplaySingleProps,
    })
  ),
  cancelReservation: PropTypes.func.isRequired,
  fetchReservations: PropTypes.func.isRequired,
  setSingleReservationDisplay: PropTypes.func.isRequired,
};

export default function withReservationDisplay(WrappedComponent) {
  class ReservationDisplayContainer extends React.PureComponent {
    render() {
      const {
        locale,
        reserveDisplay,
        reservations,
        cancelReservation,
        fetchReservations,
        setSingleReservationDisplay,
        ...restProps
      } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          reserveDisplay={reserveDisplay}
          reservations={reservations}
          cancelReservation={cancelReservation}
          fetchReservations={fetchReservations}
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
    reservations: state.reserveDisplay.list,
  });

  const mapDispatchToProp = {
    cancelReservation: reservationCancel,
    fetchReservations: reservationsFetch,
    setSingleReservationDisplay,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(ReservationDisplayContainer);
}
