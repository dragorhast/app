import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchRentalInfo, endRental } from '../redux/actions/bike-rental';

const BikeRentalInfoContainer = ({ Layout, bikeRental, getRentalInfo, fetchBikeRentalOnLoad, returnBike }) => (
  <Layout rentalInfo={bikeRental} getRentalInfo={getRentalInfo} fetchBikeRentalOnLoad={fetchBikeRentalOnLoad} returnBike={returnBike} />
);

BikeRentalInfoContainer.propTypes = {
  fetchBikeRentalOnLoad: PropTypes.bool,
  getRentalInfo: PropTypes.func.isRequired,
  returnBike: PropTypes.func.isRequired,
  Layout: PropTypes.func.isRequired,
  bikeRental: PropTypes.shape({
    bikeID: PropTypes.string,
    rentalStartTime: PropTypes.date,
    costOfRentalSoFar: PropTypes.number,
    rentalActive: PropTypes.bool,
    pickUpPoint: PropTypes.string,
  }).isRequired,
};

BikeRentalInfoContainer.defaultProps = {
  fetchBikeRentalOnLoad: true,
};

const mapStateToProps = ({ bikeRental }) => ({
  bikeRental,
});

const mapDispatchToProps = {
  getRentalInfo: fetchRentalInfo,
  returnBike: endRental,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BikeRentalInfoContainer);
