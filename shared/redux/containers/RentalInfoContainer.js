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
import { connect } from 'react-redux';

import { rentalEnd, rentalFetchInfo } from '../ducks/rental';

export default function withCurrentRental(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class RentalInfoContainer extends React.Component {
    render() {
      const { locale, rentalInfo, getRentalInfo, returnRental } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          rentalInfo={rentalInfo}
          getRentalInfo={getRentalInfo}
          returnRental={returnRental}
          {...this.props} // passes any other through
        />
      );
    }
  }

  const mapStateToProps = state => ({
    locale: state.locale.country,
    rentalInfo: state.rental,
  });

  const mapDispatchToProp = {
    getRentalInfo: rentalFetchInfo,
    returnRental: rentalEnd,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(RentalInfoContainer);
}
