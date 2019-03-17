import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DropTarget } from 'react-dnd';
import { ReactComponent as PlaneIcon } from '../../assets/plane.svg';
import { ItemTypes } from './Constants';

const DropStyle = styled.div`
  padding: 5em;
  color: rgb(214, 216, 219);
  transition: transform 0.2s ease, color 0.1s ease, filter 0.2s ease;

  &.hover {
    color: ${props => props.theme.font};
    transform: scale(1.05);
  }
  > svg {
    width: 100% !important;
    height: 100%;
  }
  > article {
    display: none !important;
  }
`;

/**
 * The drop target contract for the issue list.
 */
const issueCloseTarget = {
  drop(issueEditProps, monitor) {
    const item = monitor.getItem();
    issueEditProps.issueMoved('Close', item);
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

class CloseIssue extends React.Component {
  static propTypes = {
    style: PropTypes.object,
    isOver: PropTypes.bool.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    issueMoved: PropTypes.func.isRequired,
  };

  static defaultProps = {
    style: {},
  };

  render() {
    const { style, isOver, connectDropTarget, issueMoved } = this.props;
    return connectDropTarget(
      <div style={style}>
        <DropStyle className={isOver ? 'hover' : null}>
          <PlaneIcon />
          <div style={{ textAlign: 'center' }}>{isOver ? 'Goodbye!' : 'Close Issue'}</div>
        </DropStyle>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.ISSUE, issueCloseTarget, collect)(CloseIssue);
