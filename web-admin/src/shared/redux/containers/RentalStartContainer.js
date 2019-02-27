/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 * Must pass as props:
 * - locale
 * - function to start rental
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { rentalStartFromId } from '../ducks/rental';

export const RentalStartProps = {
  locale: PropTypes.string.isRequired,
  startRental: PropTypes.func.isRequired,
};

export default function withStartRental(WrappedComponent) {
  // Creates the wrapped component with no life cycle methods
  class RentalStartContainer extends React.PureComponent {
    render() {
      const { locale, startRental, ...restProps } = this.props;
      return <WrappedComponent locale={locale} startRental={startRental} {...restProps} />;
    }
  }

  RentalStartContainer.propTypes = {
    ...RentalStartProps,
  };

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
