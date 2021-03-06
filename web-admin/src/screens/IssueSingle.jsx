import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Select from 'react-select';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import CONFIG from '../shared/constants/config';
import {
  SSingleHeading,
  SSingleScreen,
  SInfoWith2ColumnsForLabelAndText,
  SInfoText,
  SLittleMap,
  SInfoTable,
} from '../styles/components/InfoSections';
import { SButton, SSuccessSpan, SErrorSpan } from '../styles/components/Common';
import withIssue, { IssuesProps } from '../shared/redux/containers/IssuesContainer';
import { prettyDateTime } from '../shared/util';

const BREAK_POINT = '1299px';

const SHeader = styled(SSingleHeading)`
  grid-area: header;
`;

const SInfo = styled(SInfoWith2ColumnsForLabelAndText)`
  grid-area: info;
`;

const SMap = styled(SLittleMap)`
  grid-area: map;
  display: ${props => (props.visible ? 'block' : 'none')};
  justify-self: center;
`;

const SStatusArea = styled.section`
  grid-area: status;
  justify-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const SGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(600px, 1fr) 1fr;
  grid-column-gap: 8px;
  grid-template-rows: auto;
  grid-row-gap: 32px;
  align-items: center;
  grid-template-areas:
    'header .'
    'info map'
    'status .';
  @media screen and (max-width: ${BREAK_POINT}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'info'
      'map'
      'status';
  }
`;

const STextArea = styled.textarea`
  width: 320px;
  min-height: 64px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid hsl(0, 0%, 80%);
  margin: 16px 0;
`;

const statusOptions = [
  { value: 'open', label: 'Open' },
  { value: 'review', label: 'Review' },
  { value: 'close', label: 'Close' },
];

class IssueSingle extends React.PureComponent {
  state = {
    updateStatus: 'Open',
    updateMessage: '',
    updateReturnSuccess: '',
    updateReturnError: '',
  };

  componentWillMount() {
    const { issue, fetchSingleIssue, match } = this.props;
    if (!issue.id) fetchSingleIssue(match.params.id);
    this.selectOption = this.selectOption.bind(this);
    this.submitStatusChange = this.submitStatusChange.bind(this);
  }

  /**
   * If the new issue is of type bike then
   * fetch the location of the bike associated
   * with the issue
   *
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const { issue, fetchIssueBikeLocation } = this.props;

    if (issue.bikeId && prevProps.issue.id !== issue.id) {
      fetchIssueBikeLocation(issue.bikeId);
    }
  }

  selectOption = option => {
    this.setState({ updateStatus: option.value });
  };

  /**
   * Updates the issue status and updates the
   * statusChangeReturnMessage accordingly
   * @returns {Promise<void>}
   */
  async submitStatusChange() {
    const { updateStatus, updateMessage } = this.state;
    const { updateIssueStatus, issue } = this.props;
    // Resets status
    await this.setState({ updateReturnSuccess: '', updateReturnError: '' });
    try {
      await updateIssueStatus(issue.id, updateStatus, updateMessage);
      this.setState({ updateReturnSuccess: `Successfully changed status to ${updateStatus}` });
    } catch (e) {
      this.setState({ updateReturnError: `Error: ${e.message}` });
    }
  }

  render() {
    const { issue, google } = this.props;
    const { updateMessage, updateReturnSuccess, updateReturnError } = this.state;

    return (
      <SSingleScreen>
        <SMap visible={!!issue.bikeId}>
          {issue.bikeLocation && (
            <Map
              google={google}
              zoom={17}
              zoomControl={false}
              mapTypeControl={false}
              fullscreenControl={false}
              initialCenter={{ lat: issue.bikeLocation[1], lng: issue.bikeLocation[0] }}
              center={{ lat: issue.bikeLocation[1], lng: issue.bikeLocation[0] }}
            >
              <Marker
                icon={{
                  url: '/bike marker@0.5x.png',
                  scaledSize: new google.maps.Size(/* preserving the aspect ratio */ 3.2, 4.34, 'em', 'em'),
                }}
                position={{ lat: issue.bikeLocation[1], lng: issue.bikeLocation[0] }}
              />
            </Map>
          )}
        </SMap>
        <SInfoTable>
          <tr>
            <td>Type</td>
            <td>{issue.type}</td>
          </tr>
          {issue.bikeId && (
            <tr>
              <td>Bike Id</td>
              <td>{issue.bikeId}</td>
            </tr>
          )}
          <tr>
            <td>User Id</td>
            <td>{issue.userId}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{issue.status}</td>
          </tr>
          <tr>
            <td>Time</td>
            <td>{prettyDateTime(issue.datetime)}</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{issue.description}</td>
          </tr>
        </SInfoTable>
        <SStatusArea>
          {updateReturnSuccess && <SSuccessSpan>{updateReturnSuccess}</SSuccessSpan>}
          {updateReturnError && <SErrorSpan>{updateReturnError}</SErrorSpan>}
          <h3 style={{ fontWeight: 'bold' }}>Update Status</h3>
          <div style={{ width: '100%', margin: '0' }}>
            <Select defaultValue={statusOptions[0]} options={statusOptions} onChange={this.selectOption} />
          </div>

          <STextArea
            placeholder="Information about update"
            value={updateMessage}
            onChange={e => this.setState({ updateMessage: e.target.value })}
          />
          <SButton primary onClick={this.submitStatusChange}>
            Submit
          </SButton>
        </SStatusArea>
      </SSingleScreen>
    );
  }
}

IssueSingle.propTypes = {
  ...IssuesProps,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default withIssue(GoogleApiWrapper({ apiKey: CONFIG.googleApiKey })(IssueSingle));
