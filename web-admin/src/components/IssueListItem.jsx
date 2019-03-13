import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SListItem3Columns } from '../styles/components/SidePanelSections';
import { IssueSinglePropTypes } from '../shared/redux/ducks/issues';
import { prettyDateTime } from '../shared/util';

const SStatus = styled.span`
  color: ${props => {
    switch (props.status) {
      case 'Open':
        return props.theme.success;

      default:
        return '';
    }
  }};
`;

const IssueListItem = ({ issue, selectIssues }) => (
  <SListItem3Columns onClick={() => selectIssues(issue)}>
    <SStatus status={issue.status}>{issue.status}</SStatus>
    <span>{issue.type}</span>
    <span style={{ textAlign: 'center' }}>{prettyDateTime(issue.datetime)}</span>
  </SListItem3Columns>
);

IssueListItem.propTypes = {
  issue: PropTypes.shape({
    ...IssueSinglePropTypes,
  }).isRequired,
  selectIssues: PropTypes.func.isRequired,
};

export default IssueListItem;
