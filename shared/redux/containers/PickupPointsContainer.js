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
import { connect } from 'react-redux';

import { pickupPointsFetch } from '../ducks/pickups';

export default function withCurrentRental(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class PickupPointsContainer extends React.Component {
    render() {
      const { locale, pickups, loading, getPickupPoints } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          pickups={pickups}
          loading={loading} // from pickups reducer
          getPickupPoints={getPickupPoints}
          {...this.props} // passes any other through
        />
      );
    }
  }

  const mapStateToProps = state => ({
    locale: state.locale.country,
    pickups: state.pickups.pickups,
    loading: state.pickups.loading,
  });

  const mapDispatchToProp = {
    getPickupPoints: pickupPointsFetch,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(PickupPointsContainer);
}
