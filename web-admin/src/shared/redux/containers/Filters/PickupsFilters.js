import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setPickupNameOrderAsc, setPickupStatusOrderAsc } from '../../ducks/pickups';

export const PickupFilterProps = {
  setPickupNameOrderAsc: PropTypes.func,
  setPickupStatusOrderAsc: PropTypes.func,
};

export const withPickupFilter = WrappedComponent => {
  class PickupFilter extends React.PureComponent {
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

  PickupFilter.propTypes = {
    ...PickupFilterProps,
  };

  const mapDispatchToProps = {
    setPickupNameOrderAsc,
    setPickupStatusOrderAsc,
  };

  return connect(
    null,
    mapDispatchToProps
  )(PickupFilter);
};
