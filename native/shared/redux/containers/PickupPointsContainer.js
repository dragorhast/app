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

import { pickupPointsFetch, PickupPropTypes } from '../ducks/pickups';

export const PickupProps = {
  locale: PropTypes.string.isRequired,
  pickups: PropTypes.arrayOf(
    PropTypes.shape({
      ...PickupPropTypes,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  getPickupPoints: PropTypes.func.isRequired,
};

export default function withCurrentRental(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class PickupPointsContainer extends React.PureComponent {
    render() {
      const { locale, pickups, loading, getPickupPoints, ...restProps } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          pickups={pickups}
          loading={loading} // from pickups reducer
          getPickupPoints={getPickupPoints}
          {...restProps} // passes any others through
        />
      );
    }
  }

  PickupPointsContainer.propTypes = {
    ...PickupProps,
  };

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
