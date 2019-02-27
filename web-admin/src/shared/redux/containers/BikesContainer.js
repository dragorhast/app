import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { bikesFetch, BikePropTypes } from '../ducks/bikes';

export const BikesProps = {
  locale: PropTypes.string.isRequired,
  bikes: PropTypes.arrayOf(
    PropTypes.shape({
      ...BikePropTypes,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  fetchBikes: PropTypes.func.isRequired,
};

export default function withBikes(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class BikesContainer extends React.PureComponent {
    render() {
      const { locale, loading, bikes, fetchBikes, ...restProps } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          loading={loading} // from bikes reducer
          bikes={bikes}
          fetchBikes={fetchBikes}
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
  });

  const mapDispatchToProp = {
    fetchBikes: bikesFetch,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(BikesContainer);
}
