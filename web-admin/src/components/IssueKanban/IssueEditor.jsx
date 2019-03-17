import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DragSource } from 'react-dnd';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { ItemTypes } from './Constants';
import { SIdentifier } from '../../styles/components/Common';
import { ReactComponent as Envelope } from '../../assets/envelope.svg';

const SideInfo = styled.aside`
  background-color: ${props => props.theme.primary};
  color: white;
  padding: 1em;
  display: flex;
  flex-direction: column;

  tr {
    width: 100%;
  }

  td:first-child {
    font-weight: bold;
  }
  td:last-child {
    text-align: right;
  }

  > svg {
    max-width: 3em;
    margin: 1em auto;
    width: 100% !important;
    height: 100%;
  }
`;

/**
 * The drag source contract for issues.
 */
const issueEditorSource = {
  beginDrag: (props, mon, { state }) => {
    return state.issue;
  },
};

/**
 * Specifies the props to inject into the issue component.
 */
function editorCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

class IssueEditor extends React.Component {
  static propTypes = {
    issue: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { overHandle: false, issue: props.issue };
  }

  handleResolution = event => {
    const { issue } = this.state;
    this.setState({
      issue: { ...issue, resolution: event.target.value },
    });
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { overHandle, issue } = this.state;

    const element = (
      <article style={{ opacity: isDragging ? 0 : 1 }}>
        <SideInfo
          onMouseEnter={() => this.setState({ overHandle: true })}
          onMouseLeave={() => this.setState({ overHandle: false })}
        >
          <Envelope />
          <table>
            <tbody>
              <tr>
                <td>User</td>
                <td>{issue.user_id}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{issue.status}</td>
              </tr>
              {issue.bike_identifier ? (
                <tr>
                  <td>Bike</td>
                  <td>
                    <SIdentifier>
                      <Link to={`/bikes/single/${issue.bike_identifier}`}>{issue.bike_identifier} </Link>
                    </SIdentifier>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
          <ReactTimeAgo date={new Date(issue.opened_at)} />
        </SideInfo>
        <div>
          <header>Description</header>
          <p>{issue.description}</p>
        </div>
        <div>
          <header>Resolution</header>
          <textarea value={issue.resolution} onChange={this.handleResolution} />
        </div>
      </article>
    );

    return overHandle ? connectDragSource(element) : element;
  }
}

export default DragSource(ItemTypes.ISSUE, issueEditorSource, editorCollect)(IssueEditor);
