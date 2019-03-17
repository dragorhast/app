import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import Issue from './Issue';
import { ItemTypes } from './Constants';

const SIssues = styled.div`
  flex: 1;
`;

/**
 * The drop target contract for the issue list.
 */
const issueListTarget = {
  drop(issueListProps, monitor) {
    const issue = monitor.getItem();
    issueListProps.issueMoved(issueListProps.name, issue);
  },
};

/**
 * Specifies the props to inject into the issue component.
 */
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

class IssueList extends React.Component {
  static propTypes = {
    issues: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    style: PropTypes.object,
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    issueMoved: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const { issues, name, style, connectDropTarget, isOver, issueMoved } = this.props;
    const isActive = true;
    return connectDropTarget(
      <section style={{ display: 'flex', flexDirection: 'column', ...style }}>
        <header style={{ fontWeight: isActive ? '2em' : '1em' }}>{name}</header>
        <SIssues>
          {issues.map((issue, index) => (
            <Issue key={issue.id} issue={issue} index={index} />
          ))}
        </SIssues>
      </section>
    );
  }
}

export default DropTarget(ItemTypes.ISSUE, issueListTarget, collect)(IssueList);
