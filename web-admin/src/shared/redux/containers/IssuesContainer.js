import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IssueSinglePropTypes, issuesFetch } from '../ducks/issues';

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
      const { locale, issues, fetchIssues } = this.props;

      return <WrappedComponent locale={locale} issues={issues} fetchIssues={fetchIssues} />;
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
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(IssuesContainer);
}
