import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IssueSinglePropTypes, issuesFetch, issueFetchSingle, setSingleIssueDisplay } from '../ducks/issues';

export const IssuesProps = {
  locale: PropTypes.string.isRequired,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      ...IssueSinglePropTypes,
    })
  ).isRequired,
  fetchIssues: PropTypes.func.isRequired,
  issue: PropTypes.shape({
    ...IssueSinglePropTypes,
  }).isRequired,
  fetchSingleIssue: PropTypes.func.isRequired,
  setSingleIssueDisplay: PropTypes.func.isRequired,
};

export default function withIssues(WrappedComponent) {
  class IssuesContainer extends React.PureComponent {
    render() {
      const { locale, issues, fetchIssues, issue, fetchSingleIssue, setSingleIssueDisplay, ...restProps } = this.props;

      return (
        <WrappedComponent
          locale={locale}
          issues={issues}
          fetchIssues={fetchIssues}
          issue={issue}
          fetchSingleIssue={fetchSingleIssue}
          setSingleIssueDisplay={setSingleIssueDisplay}
          {...restProps}
        />
      );
    }
  }
  IssuesContainer.propTypes = {
    ...IssuesProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    issues: state.issues.issuesList,
    issue: state.issues.issueSingle,
  });

  const mapDispatchToProps = {
    fetchIssues: issuesFetch,
    fetchSingleIssue: issueFetchSingle,
    setSingleIssueDisplay,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssuesContainer);
}
