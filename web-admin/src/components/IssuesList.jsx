import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ControlArrows from './ControlArrows';
import { IssueSinglePropTypes } from '../shared/redux/ducks/issues';
import { SListItem3Columns } from '../styles/components/SidePanelSections';
import IssueListItem from './IssueListItem';

// Similar to common SControlBar but with 3 columns
const SControlBar3 = styled(SListItem3Columns)`
  height: 48px;
`;

class IssuesList extends React.PureComponent {
  render() {
    const { issues, selectIssue } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <SControlBar3>
          <ControlArrows
            label="Status"
            onUpPress={() => console.log('up press')}
            onDownPress={() => console.log('down press')}
          />
          <ControlArrows
            label="Type"
            onUpPress={() => console.log('up press')}
            onDownPress={() => console.log('down press')}
          />
          <ControlArrows
            label="Time"
            onUpPress={() => console.log('up press')}
            onDownPress={() => console.log('down press')}
          />
        </SControlBar3>
        {issues && issues.map(issue => <IssueListItem key={issue.id} selectIssues={selectIssue} issue={issue} />)}
      </div>
    );
  }
}

IssuesList.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      ...IssueSinglePropTypes,
    })
  ).isRequired,
  selectIssue: PropTypes.func.isRequired,
};

export default IssuesList;
