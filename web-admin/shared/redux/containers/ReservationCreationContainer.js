/**
 * Higher Order Component used for a user starting a reservation
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  reservationMake,
  reservationStart,
  setDateTimeReservationCreation,
  ReservationCreationPropTypes,
} from '../ducks/reservationCreations';

export const ReservationCreationProps = {
  locale: PropTypes.string.isRequired,
  makeReservation: PropTypes.func.isRequired,
  startReserveCreate: PropTypes.func.isRequired,
  setDateTimeReservationCreation: PropTypes.func.isRequired,
  reserveCreate: PropTypes.shape({
    ...ReservationCreationPropTypes,
  }).isRequired,
};

export default function withReservationCreation(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class ReservationCreationContainer extends React.PureComponent {
    render() {
      const {
        locale,
        makeReservation,
        startReserveCreate,
        setDateTimeReservationCreation,
        reserveCreate,
        ...restProps
      } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          reserveCreate={reserveCreate}
          makeReservation={makeReservation} // from pickups reducer
          startReserveCreate={startReserveCreate}
          setDateTimeReservationCreation={setDateTimeReservationCreation}
          {...restProps} // passes any other through
        />
      );
    }
  }

  ReservationCreationContainer.propTypes = {
    ...ReservationCreationProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    reserveCreate: state.reserveCreate,
  });

  const mapDispatchToProp = {
    makeReservation: reservationMake,
    startReserveCreate: reservationStart,
    setDateTimeReservationCreation,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(ReservationCreationContainer);
}
