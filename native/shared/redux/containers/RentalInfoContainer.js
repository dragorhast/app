/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 * Must pass as props:
 * - locale
 * - rental info
 * - function to fetch current user rental
 * - function to end rental
 * - FUTURE function to CANCEL rental
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { rentalEnd, rentalFetchInfo, bikeLock, RentalPropTypes } from '../ducks/rental';

export const RentalProps = {
  locale: PropTypes.string,
  rentalInfo: PropTypes.shape({
    ...RentalPropTypes,
  }).isRequired,
  getRentalInfo: PropTypes.func.isRequired,
  returnRental: PropTypes.func.isRequired,
  lockBike: PropTypes.func.isRequired,
};

export default function withCurrentRental(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class RentalInfoContainer extends React.PureComponent {
    render() {
      const { locale, rentalInfo, getRentalInfo, returnRental, lockBike, ...restProps } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          rentalInfo={rentalInfo}
          getRentalInfo={getRentalInfo}
          returnRental={returnRental}
          lockBike={lockBike}
          {...restProps} // passes any other through
        />
      );
    }
  }

  RentalInfoContainer.propTypes = {
    ...RentalProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    rentalInfo: state.rental,
  });

  const mapDispatchToProp = {
    getRentalInfo: rentalFetchInfo,
    returnRental: rentalEnd,
    lockBike: bikeLock,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(RentalInfoContainer);
}
