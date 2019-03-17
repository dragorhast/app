import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pickupPointsFetch, PickupPropTypes } from '../ducks/pickups';
import { bikesFetchAvailable, BikePropTypes } from '../ducks/bikes';

export const MapContainerProps = {
  pickups: PropTypes.arrayOf(
    PropTypes.shape({
      ...PickupPropTypes,
    })
  ).isRequired,
  bikes: PropTypes.arrayOf(
    PropTypes.shape({
      ...BikePropTypes,
    })
  ).isRequired,
  fetchPickups: PropTypes.func.isRequired,
  fetchBikes: PropTypes.func.isRequired,
};

export default function withBikesAndPickups(WrappedComponent) {
  class MapContainer extends React.PureComponent {
    render() {
      const { pickups, fetchPickups, bikes, fetchBikes } = this.props;
      return <WrappedComponent pickups={pickups} fetchPickups={fetchPickups} bikes={bikes} fetchBikes={fetchBikes} />;
    }
  }

  MapContainer.propTypes = {
    ...MapContainerProps,
  };

  const mapStateToProps = state => ({
    pickups: state.pickups.pickups,
    bikes: state.bikes.bikes,
  });

  const mapDispatchToProps = {
    fetchPickups: pickupPointsFetch,
    fetchBikes: bikesFetchAvailable,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(MapContainer);
}
