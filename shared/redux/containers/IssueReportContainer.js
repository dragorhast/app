/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 * Must pass as props:
 * - locale
 * - rental bikeId
 * - function to report issue
 */
import React from 'react';
import { connect } from 'react-redux';
import { issueReport } from '../ducks/issue';

export default function withIssue(WrappedComponent) {
  // Creates the wrapped component with no life cycle methods
  const RentalStartContainer = ({ locale, bikeId, reportIssue }) => (
    <WrappedComponent locale={locale} bikeId={bikeId} reportIssue={reportIssue} />
  );

  const mapStateToProps = state => ({
    locale: state.locale.country,
    bikeId: state.rental.bikeId,
  });

  const mapDispatchToProp = {
    reportIssue: issueReport,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(RentalStartContainer);
}
