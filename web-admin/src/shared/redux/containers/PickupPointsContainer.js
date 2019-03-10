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

import { pickupPointsFetch, PickupPropTypes, getPickupsWithFilters } from '../ducks/pickups';
import { setPickup, pickupSingleFetch, pickupBikesFetch, pickupReservationsFetch } from '../ducks/pickupSingle';
import { BikePropTypes } from '../ducks/bikeSingle';
import { ReservationDisplaySingleProps } from '../ducks/reservationDisplay';

export const PickupProps = {
  locale: PropTypes.string.isRequired,
  pickups: PropTypes.arrayOf(
    PropTypes.shape({
      ...PickupPropTypes,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  getPickupPoints: PropTypes.func.isRequired,
  setSinglePickupDisplay: PropTypes.func.isRequired,
  fetchSinglePickup: PropTypes.func.isRequired,
  fetchPickupBikes: PropTypes.func.isRequired,
  pickupPointBikes: PropTypes.arrayOf(
    PropTypes.shape({
      ...BikePropTypes,
    })
  ).isRequired,
  fetchPickupReservations: PropTypes.func.isRequired,
  pickupPointReservations: PropTypes.arrayOf(
    PropTypes.shape({
      ...ReservationDisplaySingleProps,
    })
  ).isRequired,
};

export default function withPickupPoints(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class PickupPointsContainer extends React.PureComponent {
    render() {
      const {
        locale,
        pickups,
        pickup,
        loading,
        getPickupPoints,
        fetchSinglePickup,
        setSinglePickupDisplay,
        fetchPickupBikes,
        pickupPointBikes,
        fetchPickupReservations,
        pickupPointReservations,
        ...restProps
      } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          pickups={pickups}
          pickup={pickup}
          loading={loading} // from pickups reducer
          getPickupPoints={getPickupPoints}
          fetchSinglePickup={fetchSinglePickup}
          setSinglePickupDisplay={setSinglePickupDisplay}
          fetchPickupBikes={fetchPickupBikes}
          pickupPointBikes={pickupPointBikes}
          fetchPickupReservations={fetchPickupReservations}
          pickupPointReservations={pickupPointReservations}
          {...restProps} // passes any others through
        />
      );
    }
  }

  PickupPointsContainer.propTypes = {
    ...PickupProps,
  };

  const mapStateToProps = ({ locale, pickups, pickupSingle }) => ({
    locale: locale.country,
    pickups: getPickupsWithFilters(pickups.pickups, pickups.nameFilter, pickups.statusFilter),
    pickup: pickupSingle.pickup,
    pickupPointBikes: pickupSingle.bikes,
    pickupPointReservations: pickupSingle.reservations,
    loading: pickups.loading,
  });

  const mapDispatchToProp = {
    getPickupPoints: pickupPointsFetch,
    setSinglePickupDisplay: setPickup,
    fetchSinglePickup: pickupSingleFetch,
    fetchPickupBikes: pickupBikesFetch,
    fetchPickupReservations: pickupReservationsFetch,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(PickupPointsContainer);
}
