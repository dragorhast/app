import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { startRentalFromId } from '../redux/actions/bike-rental';

// eslint-disable-next-line no-shadow
const BikeRentalStartContainer = ({ Layout, startRentalFromId }) => (
  <Layout startRentalFromId={startRentalFromId} />
);
BikeRentalStartContainer.propTypes = {
  Layout: PropTypes.func.isRequired,
  startRentalFromId: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  startRentalFromId,
};

export default connect(
  null,
  mapDispatchToProps
)(BikeRentalStartContainer);
