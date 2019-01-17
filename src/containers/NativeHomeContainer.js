/**
 * Passes to the Home Page the bike rental status
 * so that the page can decide what to render
 *
 * Doesn't use the Layout props because this file
 * will always be used on the Native platform
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Home from '../native/pages/Home';
import { BikeRentalPropTypes } from '../redux/reducers/bike-rental';

const NativeHomeContainer = ({ bikeRental }) => <Home bikeRental={bikeRental} />;

NativeHomeContainer.propTypes = {
  bikeRental: PropTypes.shape({
    ...BikeRentalPropTypes,
  }).isRequired,
};

const mapStateToProps = ({ bikeRental }) => ({
  bikeRental,
});

export default connect(mapStateToProps)(NativeHomeContainer);
