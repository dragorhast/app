import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CloseIssue from '../components/IssueKanban/CloseIssue';
import { Firebase } from '../shared/constants/firebase';
import { apiIssuesFetch, apiIssueUpdate } from '../shared/api/tap2go';
import { ReactComponent as InfoCircle } from '../assets/info.svg';
import IssueList from '../components/IssueKanban/IssueList';
import EditIssue from '../components/IssueKanban/EditIssue';

const SIssuesView = styled.main`
  color: ${props => props.theme.font};
  background-color: rgb(240, 242, 245);
  flex: 1;
  display: grid;
  grid-template-rows: 300px auto auto 1fr;
  grid-template-columns: auto 300px 300px 300px auto;
  grid-gap: 1em;
  padding-top: 2em;
  > header {
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 3em;
  }
  > section {
    > header {
      user-select: none;
      background-color: ${props => props.theme.primary};
      color: white;
      padding: 0.5em;
      font-weight: bold;
    }
    background-color: rgb(230, 232, 235);
    box-shadow: inset 0 0.1em 0.2em rgba(0, 0, 0, 0.3);
    border-bottom: 0.2em solid rgb(247, 248, 252);
    border-radius: 0.2em;
    overflow: hidden;
  }
`;

class IssuesView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openIssues: [], inReviewIssues: [], issueObject: {}, editingIssue: null };
  }

  async componentDidMount() {
    const authToken = await Firebase.auth().currentUser.getIdToken();
    const issues = await apiIssuesFetch(authToken);

    const openIssues = [];
    const inReviewIssues = [];
    const issueObject = {};
    issues.forEach(issue => {
      issueObject[issue.id] = issue;
      (issue.status === 'open' ? openIssues : inReviewIssues).push(issue.id);
    });

    this.setState({ openIssues, inReviewIssues, issueObject });
  }

  /**
   * Calculates the new state of the issue depending on where it is dropped.
   * @param movedIssue A copy of the provided issue.
   */
  issueMoved = (location, { ...movedIssue }) => {
    let { editingIssue, openIssues, inReviewIssues } = this.state;
    const { issueObject } = this.state;

    switch (location) {
      case 'Edit':
        if (editingIssue === null) {
          openIssues = openIssues.filter(id => id !== movedIssue.id);
          inReviewIssues = inReviewIssues.filter(id => id !== movedIssue.id);
          editingIssue = movedIssue.id;
        }
        break;
      case 'Close':
        openIssues = openIssues.filter(id => id !== movedIssue.id);
        inReviewIssues = inReviewIssues.filter(id => id !== movedIssue.id);
        editingIssue = null;
        movedIssue.status = 'closed';
        break;
      case 'Open':
        if (openIssues.indexOf(movedIssue.id) >= 0) return;
        openIssues = openIssues.filter(id => id !== movedIssue.id);
        inReviewIssues = inReviewIssues.filter(id => id !== movedIssue.id);
        editingIssue = editingIssue !== movedIssue.id ? editingIssue : null;
        movedIssue.status = 'open';
        openIssues.push(movedIssue.id);
        break;
      case 'In Review':
        if (inReviewIssues.indexOf(movedIssue.id) >= 0) return;
        openIssues = openIssues.filter(id => id !== movedIssue.id);
        inReviewIssues = inReviewIssues.filter(id => id !== movedIssue.id);
        editingIssue = editingIssue !== movedIssue.id ? editingIssue : null;
        movedIssue.status = 'in_review';
        inReviewIssues.push(movedIssue.id);
        break;
      default:
        break;
    }

    const prevIssue = issueObject[movedIssue.id];
    if (movedIssue.status !== prevIssue.status || movedIssue.resolution !== prevIssue.resolution) {
      this.updateIssue(movedIssue);
    }

    issueObject[movedIssue.id] = movedIssue;
    this.setState({ openIssues, inReviewIssues, editingIssue });
  };

  updateIssue = async issue => {
    const authToken = await Firebase.auth().currentUser.getIdToken();
    await apiIssueUpdate(authToken, issue.id, issue.status, issue.resolution);
  };

  render() {
    const { openIssues, inReviewIssues, issueObject, editingIssue } = this.state;

    return (
      <SIssuesView>
        <EditIssue
          style={{ gridArea: '1 / 5 / 2 / 2' }}
          issue={issueObject[editingIssue]}
          issueMoved={this.issueMoved}
        />
        <header style={{ gridArea: '2 / 5 / 3 / 2' }}>Issues</header>
        <IssueList
          name="Open"
          issues={openIssues.map(id => issueObject[id])}
          style={{ gridColumnStart: 2, gridRowStart: 3 }}
          issueMoved={this.issueMoved}
        />
        <IssueList
          name="In Review"
          issues={inReviewIssues.map(id => issueObject[id])}
          style={{ gridColumnStart: 3, gridRowStart: 3 }}
          issueMoved={this.issueMoved}
        />
        <CloseIssue style={{ gridColumnStart: 4, gridRowStart: 3 }} issueMoved={this.issueMoved} />
        <InfoCircle
          style={{ position: 'absolute', top: '5em', right: '1em', height: '2em', cursor: 'pointer' }}
          onClick={event => console.log(event)}
        />
      </SIssuesView>
    );
  }
}

export default DragDropContext(HTML5Backend)(IssuesView);
