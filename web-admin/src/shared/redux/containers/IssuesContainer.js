import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  IssueSinglePropTypes,
  issuesFetch,
  issueFetchSingle,
  setSingleIssueDisplay,
  getIssuesWithFilter,
  issueUpdateStatus,
} from '../ducks/issues';

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
  updateIssueStatus: PropTypes.func.isRequired,
};

export default function withIssues(WrappedComponent) {
  class IssuesContainer extends React.PureComponent {
    render() {
      const {
        locale,
        issues,
        fetchIssues,
        issue,
        fetchSingleIssue,
        setSingleIssueDisplay,
        updateIssueStatus,
        ...restProps
      } = this.props;

      return (
        <WrappedComponent
          locale={locale}
          issues={issues}
          fetchIssues={fetchIssues}
          issue={issue}
          fetchSingleIssue={fetchSingleIssue}
          setSingleIssueDisplay={setSingleIssueDisplay}
          updateIssueStatus={updateIssueStatus}
          {...restProps}
        />
      );
    }
  }
  IssuesContainer.propTypes = {
    ...IssuesProps,
  };

  const mapStateToProps = ({ locale, issues }) => ({
    locale: locale.country,
    issues: getIssuesWithFilter(issues.issuesList, issues.statusFilter, issues.typeFilter, issues.timeFilter),
    issue: issues.issueSingle,
  });

  const mapDispatchToProps = {
    fetchIssues: issuesFetch,
    fetchSingleIssue: issueFetchSingle,
    updateIssueStatus: issueUpdateStatus,
    setSingleIssueDisplay,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssuesContainer);
}
