/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 * Must pass as props:
 * - locale
 * - list of pickup points
 * - function to fetch pickup points
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  reservationMake,
  reservationCreate,
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
    startReserveCreate: reservationCreate,
    setDateTimeReservationCreation,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(ReservationCreationContainer);
}
