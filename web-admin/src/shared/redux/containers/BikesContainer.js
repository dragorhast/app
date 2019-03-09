import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bikesFetch, BikePropTypes } from '../ducks/bikes';
import { setBike, bikeSingleFetch } from '../ducks/bikeSingle';

export const BikesProps = {
  locale: PropTypes.string.isRequired,
  bikes: PropTypes.arrayOf(
    PropTypes.shape({
      ...BikePropTypes,
    })
  ).isRequired,
  bike: PropTypes.shape({
    ...BikePropTypes,
  }),
  loading: PropTypes.bool.isRequired,
  fetchBikes: PropTypes.func.isRequired,
  fetchSingleBike: PropTypes.func.isRequired,
};

export default function withBikes(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class BikesContainer extends React.PureComponent {
    render() {
      const {
        locale,
        loading,
        bikes,
        bike,
        fetchBikes,
        fetchSingleBike,
        setSingleReservationDisplay,
        ...restProps
      } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          loading={loading} // from bikes reducer
          bikes={bikes}
          bike={bike}
          fetchBikes={fetchBikes}
          fetchSingleBike={fetchSingleBike}
          setSingleBikeDisplay={setSingleReservationDisplay}
          {...restProps} // passes any others through
        />
      );
    }
  }

  BikesContainer.propTypes = {
    ...BikesProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    loading: state.bikes.loading,
    bikes: state.bikes.bikes,
    bike: state.bikeSingle,
  });

  const mapDispatchToProp = {
    fetchBikes: bikesFetch,
    setSingleReservationDisplay: setBike,
    fetchSingleBike: bikeSingleFetch,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(BikesContainer);
}
