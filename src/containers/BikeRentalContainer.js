import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startRentalFromId } from '../redux/actions/bike-rental';

// eslint-disable-next-line no-shadow
const BikeRentalContainer = ({ Layout, startRentalFromId, bikeRental }) => (
  <Layout startRentalFromId={startRentalFromId} rentalInfo={bikeRental} />
);
BikeRentalContainer.propTypes = {
  Layout: PropTypes.func.isRequired,
  startRentalFromId: PropTypes.func.isRequired,
  bikeRental: PropTypes.shape({
    bikeID: PropTypes.string,
    rentalStartTime: PropTypes.instanceOf(Date), // TODO check best
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
)(BikeRentalContainer);
