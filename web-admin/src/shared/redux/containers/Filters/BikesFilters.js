import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setBikesLocationOrderAsc, setBikesStatusFilterAsc } from '../../ducks/bikes';

export const BikesFiltersProps = {
  setBikesLocationOrderAsc: PropTypes.func,
  setBikesStatusFilterAsc: PropTypes.func,
};

export const withBikesFilters = WrappedComponent => {
  class BikesFilters extends React.PureComponent {
    render() {
      const { setBikesLocationOrderAsc, setBikesStatusFilterAsc, ...restProps } = this.props;

      return (
        <WrappedComponent
          setBikesLocationOrderAsc={setBikesLocationOrderAsc}
          setBikesStatusFilterAsc={setBikesStatusFilterAsc}
          {...restProps}
        />
      );
    }
  }

  BikesFilters.propTypes = {
    ...BikesFiltersProps,
  };

  const mapDispatchToProps = {
    setBikesLocationOrderAsc,
    setBikesStatusFilterAsc,
  };

  return connect(
    null,
    mapDispatchToProps
  )(BikesFilters);
};
