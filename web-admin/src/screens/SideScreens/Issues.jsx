import React from 'react';
import withIssues, { IssuesProps } from '../../shared/redux/containers/IssuesContainer';
import { SSideComponent } from '../../styles/components/SidePanelSections';
import IssuesList from '../../components/IssuesList';

class Issues extends React.PureComponent {
  componentWillMount() {
    const { fetchIssues } = this.props;
    fetchIssues();
  }

  render() {
    const { issues } = this.props;
    return (
      <SSideComponent>
        <IssuesList issues={issues} />
      </SSideComponent>
    );
  }
}

Issues.propTypes = {
  ...IssuesProps,
};
export default withIssues(Issues);
