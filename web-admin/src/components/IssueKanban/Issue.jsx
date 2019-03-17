import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragSource } from 'react-dnd';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { ItemTypes } from './Constants';
import { SIdentifier } from '../../styles/components/Common';

const SIssueCard = styled.article`
  padding: 1em;
  background-color: white;
  margin: 0.5em;
  box-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.1);
  border-radius: 0.2em;
  cursor: grab;
  > footer {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    font-size: 0.8em;
    opacity: 0.5;
    padding-top: 0.5em;
    margin-top: 0.5em;
  }
`;

/**
 * The drag source contract for issues.
 */
const issueSource = {
  beginDrag: props => props.issue,
};

/**
 * Specifies the props to inject into the issue component.
 */
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class Issue extends React.Component {
  static propTypes = {
    issue: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  render() {
    const {
      issue: { description, opened_at, bike_identifier },
      isDragging,
      connectDragSource,
    } = this.props;

    return connectDragSource(
      <div style={{ opacity: isDragging ? 0 : 1 }}>
        <SIssueCard>
          <div>{description}</div>
          <footer>
            <ReactTimeAgo date={new Date(opened_at)} />
            {bike_identifier ? (
              <SIdentifier>
                <Link to={`/bikes/single/${bike_identifier}`}>{bike_identifier} </Link>
              </SIdentifier>
            ) : null}
          </footer>
        </SIssueCard>
      </div>
    );
  }
}

export default DragSource(ItemTypes.ISSUE, issueSource, collect)(Issue);
