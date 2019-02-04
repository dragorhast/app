/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 * Must pass as props:
 * - locale
 * - function to start rental
 */
import React from 'react';
import { connect } from 'react-redux';

import { rentalStartFromId } from '../ducks/rental';

export default function withStartRental(WrappedComponent) {
  // Creates the wrapped component with no life cycle methods
  const RentalStartContainer = ({ locale, startRental }) => <WrappedComponent locale={locale} startRental={startRental} />;

  const mapStateToProps = state => ({
    locale: state.locale.country,
  });

  const mapDispatchToProp = {
    startRental: rentalStartFromId,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(RentalStartContainer);
}
