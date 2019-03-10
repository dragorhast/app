import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setBikesLocationOrderAsc, setBikesStatusFilterAsc } from '../../ducks/bikes';

export const BikeFilterProps = {
  setBikesLocationOrderAsc: PropTypes.func,
  setBikesStatusFilterAsc: PropTypes.func,
};

export const withBikeFilter = WrappedComponent => {
  class BikeFilter extends React.PureComponent {
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

  BikeFilter.propTypes = {
    ...BikeFilterProps,
  };

  const mapDispatchToProps = {
    setBikesLocationOrderAsc,
    setBikesStatusFilterAsc,
  };

  return connect(
    null,
    mapDispatchToProps
  )(BikeFilter);
};
