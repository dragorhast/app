import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ControlArrows from './ControlArrows';
import { IssueSinglePropTypes } from '../shared/redux/ducks/issues';
import { SListItem3Columns } from '../styles/components/SidePanelSections';
import IssueListItem from './IssueListItem';
import { withIssuesFilters, IssuesFiltersProps } from '../shared/redux/containers/Filters/IssuesFilters';

// Similar to common SControlBar but with 3 columns
const SControlBar3 = styled(SListItem3Columns)`
  height: 48px;
`;

class IssuesList extends React.PureComponent {
  render() {
    const { issues, selectIssue, setIssuesStatusOrderAsc, setIssuesTypeOrderAsc, setIssuesTimeOrderAsc } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <SControlBar3>
          <ControlArrows
            label="Status"
            onUpPress={() => setIssuesStatusOrderAsc(false)}
            onDownPress={() => setIssuesStatusOrderAsc(true)}
          />
          <ControlArrows
            label="Type"
            onUpPress={() => setIssuesTypeOrderAsc(false)}
            onDownPress={() => setIssuesTypeOrderAsc(true)}
          />
          <ControlArrows
            label="Time"
            onUpPress={() => setIssuesTimeOrderAsc(false)}
            onDownPress={() => setIssuesTimeOrderAsc(true)}
          />
        </SControlBar3>
        {issues && issues.map(issue => <IssueListItem key={issue.id} selectIssues={selectIssue} issue={issue} />)}
      </div>
    );
  }
}

IssuesList.propTypes = {
  ...IssuesFiltersProps,
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      ...IssueSinglePropTypes,
    })
  ).isRequired,
  selectIssue: PropTypes.func.isRequired,
};

export default withIssuesFilters(IssuesList);
