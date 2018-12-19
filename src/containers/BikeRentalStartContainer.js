import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startRentalFromId } from '../redux/actions/bike-rental';

// eslint-disable-next-line no-shadow
const BikeRentalStartContainer = ({ Layout, startRentalFromId, bikeRental,  }) => (
  <Layout startRentalFromId={startRentalFromId} rentalInfo={bikeRental} />
);
BikeRentalStartContainer.propTypes = {
  Layout: PropTypes.func.isRequired,
  startRentalFromId: PropTypes.func.isRequired,
  bikeRental: PropTypes.shape({
    bikeID: PropTypes.string,
    rentalStartTime: PropTypes.date,
    costOfRentalSoFar: PropTypes.number,
    rentalEnded: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = ({ bikeRental }) => ({
  bikeRental,
});

const mapDispatchToProps = {
  startRentalFromId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BikeRentalStartContainer);
