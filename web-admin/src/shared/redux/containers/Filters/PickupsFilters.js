import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPickupNameOrderAsc, setPickupStatusOrderAsc } from '../../ducks/pickups';

export const PickupsFiltersProps = {
  setPickupNameOrderAsc: PropTypes.func,
  setPickupStatusOrderAsc: PropTypes.func,
};

export const withPickupsFilters = WrappedComponent => {
  class PickupsFilters extends React.PureComponent {
    render() {
      const { setPickupNameOrderAsc, setPickupStatusOrderAsc, ...restProps } = this.props;

      return (
        <WrappedComponent
          setPickupNameOrderAsc={setPickupNameOrderAsc}
          setPickupStatusOrderAsc={setPickupStatusOrderAsc}
          {...restProps}
        />
      );
    }
  }

  PickupsFilters.propTypes = {
    ...PickupsFiltersProps,
  };

  const mapDispatchToProps = {
    setPickupNameOrderAsc,
    setPickupStatusOrderAsc,
  };

  return connect(
    null,
    mapDispatchToProps
  )(PickupsFilters);
};
