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
} from '../styles/components/InfoSections';
import { SButton } from '../styles/components/Common';
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
  justify-self: center;
`;

const SStatusArea = styled.div`
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
  { value: 'Open', label: 'Open' },
  { value: 'Review', label: 'Review' },
  { value: 'Closed', label: 'Closed' },
];

class IssueSingle extends React.PureComponent {
  state = {
    selectedUpdateIssueOption: 'Open',
    updateIssueMessage: '',
  };

  componentWillMount() {
    const { issue, fetchSingleIssue, match } = this.props;
    if (!issue.id) fetchSingleIssue(match.params.id);
    this.selectOption = this.selectOption.bind(this);
  }

  selectOption = option => {
    const { selectedUpdateIssueOption } = this.state;
    console.log('Before Selection: ', selectedUpdateIssueOption);
    this.setState({ selectedUpdateIssueOption: option.value });
  };

  render() {
    const { issue, google } = this.props;
    const { updateIssueMessage } = this.state;

    return (
      <SSingleScreen>
        <SGrid>
          <SHeader>Issue Details</SHeader>
          <SInfo>
            <SInfoText primary>Type</SInfoText>
            <SInfoText>{issue.type}</SInfoText>

            {issue.bikeId && <SInfoText primary>Bike Id</SInfoText>}
            {issue.bikeId && <SInfoText>{issue.bikeId}</SInfoText>}

            <SInfoText primary>User Id</SInfoText>
            <SInfoText>{issue.userId}</SInfoText>

            <SInfoText primary>Status</SInfoText>
            <SInfoText>{issue.status}</SInfoText>

            <SInfoText primary>Time</SInfoText>
            <SInfoText>{prettyDateTime(issue.datetime)}</SInfoText>

            <SInfoText primary>Description</SInfoText>
            <SInfoText>{issue.description}</SInfoText>
          </SInfo>

          <SMap>
            {issue.bikeId && (
              <Map
                style={{ width: '240px', height: '240px' }}
                google={google}
                zoom={17}
                zoomControl={false}
                mapTypeControl={false}
                fullscreenControl={false}
                initialCenter={{ lat: '55.9520111', lng: '-3.2091049' }}
                center={{ lat: '55.9520111', lng: '-3.2091049' }}
              >
                <Marker icon="/bike-icon-fa.png" position={{ lat: '55.9520111', lng: '-3.2091049' }} />
              </Map>
            )}
          </SMap>

          <SStatusArea>
            <SInfoText primary>Change Status</SInfoText>
            <div style={{ width: '100%', margin: '16px 0' }}>
              <Select defaultValue={statusOptions[0]} options={statusOptions} onChange={this.selectOption} />
            </div>

            <STextArea
              placeholder="Information about update"
              value={updateIssueMessage}
              onChange={e => this.setState({ updateIssueMessage: e.target.value })}
            />

            <SButton primary>Update</SButton>
          </SStatusArea>
        </SGrid>
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
