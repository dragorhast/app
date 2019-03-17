import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragSource, DropTarget } from 'react-dnd';
import { Prompt } from 'react-router-dom';
import { ReactComponent as Envelope } from '../../assets/envelope.svg';
import { ItemTypes } from './Constants';
import IssueEditor from './IssueEditor';

const DropStyle = styled.div`
  color: rgb(214, 216, 219);
  position: relative;
  padding: 1em;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px dashed rgba(0, 0, 0, 0.2);

  > div {
    box-sizing: border-box;
    margin: 2em;
    transition: transform 0.2s ease, color 0.1s ease, filter 0.2s ease;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.hover {
      color: ${props => props.theme.font};
      transform: scale(1.05);
    }
    > svg {
      display: inline;
      max-width: 9em;
      margin: 1em;
      width: 100% !important;
      height: 100%;
    }
  }

  > article {
    color: ${props => props.theme.font};
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    background-color: white;
    box-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.1);
    border-radius: 0.2em;
    overflow: hidden;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 1em;
      > header {
        font-weight: bold;
        margin-bottom: 0.5em;
      }
      > p {
        margin: 0;
      }
      > textarea {
        flex: 1;
        resize: none;
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 1em;
        font-family: ${props => props.theme.fontFamily};
      }
    }
  }
`;

/**
 * The drop target contract for the issue list.
 */
const issueEditTarget = {
  drop(issueEditProps, monitor) {
    const item = monitor.getItem();
    issueEditProps.issueMoved('Edit', item);
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

class EditIssue extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    issue: PropTypes.any,
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    issueMoved: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
    issue: null,
  };

  render() {
    const { style, issue, connectDropTarget, isOver, issueMoved } = this.props;
    return connectDropTarget(
      <div style={style}>
        <Prompt when={!!issue} message="Unsaved changes. Do you wish to discard them?" />
        <DropStyle>
          {issue ? (
            <IssueEditor issue={issue} />
          ) : (
            <div className={isOver ? 'hover' : null}>
              <Envelope />
              Inspect Issue
            </div>
          )}
        </DropStyle>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.ISSUE, issueEditTarget, collect)(EditIssue);
