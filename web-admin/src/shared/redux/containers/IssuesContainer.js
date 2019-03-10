import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IssueSinglePropTypes, issuesFetch, setSingleIssueDisplay } from '../ducks/issues';

export const IssuesProps = {
  locale: PropTypes.string.isRequired,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      ...IssueSinglePropTypes,
    })
  ).isRequired,
  fetchIssues: PropTypes.func.isRequired,
};

export default function withIssues(WrappedComponent) {
  class IssuesContainer extends React.PureComponent {
    render() {
      const { locale, issues, fetchIssues, setSingleIssueDisplay, ...restProps } = this.props;

      return (
        <WrappedComponent
          locale={locale}
          issues={issues}
          fetchIssues={fetchIssues}
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
  });

  const mapDispatchToProps = {
    fetchIssues: issuesFetch,
    setSingleIssueDisplay,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssuesContainer);
}
