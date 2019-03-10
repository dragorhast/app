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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { issueReport } from '../ducks/issues';

export const IssueReportProps = {
  locale: PropTypes.string.isRequired,
  bikeId: PropTypes.string,
  reportIssue: PropTypes.func.isRequired,
};

export default function withIssue(WrappedComponent) {
  // Creates the wrapped component with no life cycle methods
  class IssueReportContainer extends React.PureComponent {
    render() {
      const { locale, bikeId, reportIssue, ...restProps } = this.props;
      return <WrappedComponent locale={locale} bikeId={bikeId} reportIssue={reportIssue} {...restProps} />;
    }
  }

  IssueReportContainer.propTypes = {
    ...IssueReportProps,
  };

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
  )(IssueReportContainer);
}
