import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchRentalInfo } from '../redux/actions/bike-rental';

class BikeRentalInfoContainer extends Component {
  static propTypes = {
    getRentalInfo: PropTypes.func.isRequired,
    Layout: PropTypes.func.isRequired,
    bikeRental: PropTypes.shape({
      bikeID: PropTypes.string,
      rentalStartTime: PropTypes.date,
      costOfRentalSoFar: PropTypes.number,
      rentalActive: PropTypes.bool,
      pickUpPoint: PropTypes.string,
    }).isRequired,
  };

  componentWillMount() {
    const { getRentalInfo } = this.props;
    getRentalInfo();
  }

  render() {
    const { Layout, bikeRental } = this.props;

    return <Layout rentalInfo={bikeRental} />;
  }
}

const mapStateToProps = ({ bikeRental }) => ({
  bikeRental,
});

const mapDispatchToProps = {
  getRentalInfo: fetchRentalInfo,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BikeRentalInfoContainer);
