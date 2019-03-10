import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setReservationNameOrderAsc, setReservationTimeOrderAsc } from '../../ducks/reservationDisplay';

export const ReservationsFilterProps = {
  setReservationNameOrderAsc: PropTypes.func,
  setReservationTimeOrderAsc: PropTypes.func,
};

export const withReservationsFilters = WrappedComponent => {
  class ReservationsFilters extends React.PureComponent {
    render() {
      const { setReservationNameOrderAsc, setReservationTimeOrderAsc, ...restProps } = this.props;

      return (
        <WrappedComponent
          setReservationNameOrderAsc={setReservationNameOrderAsc}
          setReservationTimeOrderAsc={setReservationTimeOrderAsc}
          {...restProps}
        />
      );
    }
  }

  ReservationsFilters.propTypes = {
    ...ReservationsFilterProps,
  };

  const mapDispatchToProps = {
    setReservationNameOrderAsc,
    setReservationTimeOrderAsc,
  };

  return connect(
    null,
    mapDispatchToProps
  )(ReservationsFilters);
};
