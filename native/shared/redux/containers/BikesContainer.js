import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bikesFetch, BikePropTypes, getBikesWithFilter } from '../ducks/bikes';
import { setBike, bikeSingleFetch, bikeSingleFetchIssues } from '../ducks/bikeSingle';

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
  fetchBikeIssues: PropTypes.func.isRequired,
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
        fetchBikeIssues,
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
          fetchBikeIssues={fetchBikeIssues}
          setSingleBikeDisplay={setSingleReservationDisplay}
          {...restProps} // passes any others through
        />
      );
    }
  }

  BikesContainer.propTypes = {
    ...BikesProps,
  };

  const mapStateToProps = ({ locale, bikes, bikeSingle }) => ({
    locale: locale.country,
    loading: bikes.loading,
    bikes: getBikesWithFilter(bikes.bikes, bikes.locationFilter, bikes.statusFilter),
    bike: bikeSingle,
  });

  const mapDispatchToProp = {
    fetchBikes: bikesFetch,
    setSingleReservationDisplay: setBike,
    fetchSingleBike: bikeSingleFetch,
    fetchBikeIssues: bikeSingleFetchIssues,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(BikesContainer);
}
