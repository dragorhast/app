import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BikePropTypes } from '../ducks/bikes';

export const BikeProps = {
  bike: PropTypes.shape({
    ...BikePropTypes,
  }),
};

export default function withBike(WrappedComponent) {
  class BikeContainer extends React.PureComponent {
    render() {
      // const { bike } = this.props;
      const bike = {
        id: '8816b3',
        coordinates: [55.37, -3.2],
        distance: 0.3,
      };
      return <WrappedComponent bike={bike} />;
    }
  }

  BikeContainer.propTypes = {
    ...BikeProps,
  };

  const mapStateToProps = state => ({
    bike: state.bikeSingle,
  });

  return connect(mapStateToProps)(BikeContainer);
}
