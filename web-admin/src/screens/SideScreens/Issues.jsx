import React from 'react';
import PropTypes from 'prop-types';
import withIssues, { IssuesProps } from '../../shared/redux/containers/IssuesContainer';
import { SSideComponent } from '../../styles/components/SidePanelSections';
import IssuesList from '../../components/IssuesList';

class Issues extends React.PureComponent {
  componentWillMount() {
    const { fetchIssues } = this.props;
    fetchIssues();
    this.selectIssue = this.selectIssue.bind(this);
  }

  selectIssue = async issue => {
    const { setSingleIssueDisplay, history } = this.props;
    await setSingleIssueDisplay({ ...issue });
    history.push(`issues/single/${issue.id}`);
  };

  render() {
    const { issues } = this.props;
    return (
      <SSideComponent>
        <IssuesList issues={issues} selectIssue={this.selectIssue} />
      </SSideComponent>
    );
  }
}

Issues.propTypes = {
  ...IssuesProps,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default withIssues(Issues);
