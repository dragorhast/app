import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import styled from 'styled-components';
import CONFIG from '../shared/constants/config';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';
import {
  SSingleScreen,
  SSingleHeading,
  SInfoWith2ColumnsForLabelAndText,
  SInfoText,
  SLittleMap,
} from '../styles/components/InfoSections';
import { SButton } from '../styles/components/Common';
import IssuesList from '../components/IssuesList';
import { MID_RANGE_BREAK_POINT } from '../styles/constants';

const SBikeGrid = styled.div`
  display: grid;
  grid-template-areas:
    'info map'
    'button .'
    'issues issues';

  grid-template-columns: 1fr 1fr;
  grid-column-gap: 16px;
  grid-row-gap: 16px;

  justify-items: center;

  @media screen and (max-width: ${props => props.breakpoint || `${MID_RANGE_BREAK_POINT}px`}) {
    grid-template-columns: 1fr;
    grid-template-areas:
      'info'
      'button'
      'issues'
      'map';
  }
`;

const SCircButton = styled(SButton)`
  grid-area: button;
  max-height: 80px;
  max-width: 160px;
`;

class BikeSingle extends React.PureComponent {
  componentWillMount() {
    const { bike, fetchSingleBike, fetchBikeIssues, match } = this.props;
    if (!bike.id) {
      fetchSingleBike(match.params.id);
    }
    fetchBikeIssues(match.params.id);
  }

  /**
   * If there is a change to bike id passed
   * as props then re-fetch the bike's issues
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const { bike, fetchBikeIssues } = this.props;
    if (bike.id !== prevProps.bike.id) {
      fetchBikeIssues(bike.id);
    }
  }

  decideButton = status => {
    const { putBikeInCirculation } = this.props;
    switch (status) {
      // Can be put in to circulation
      case 'Out of Circ':
        return (
          <SCircButton primary onClick={() => putBikeInCirculation(true)}>
            Put in to Circulation
          </SCircButton>
        );
      // Can be taken out of circulation
      case 'Available' || 'Broken' || 'Needs Serviced':
        return (
          <SCircButton danger onClick={() => putBikeInCirculation(false)}>
            Take out of Circulation
          </SCircButton>
        );
      case 'Rented':
      default:
        return <SCircButton disabled>Put in to Circulation</SCircButton>;
    }
  };

  render() {
    const { bike, google } = this.props;
    return (
      <SSingleScreen>
        <SSingleHeading>Bike Details</SSingleHeading>
        <SBikeGrid>
          <SInfoWith2ColumnsForLabelAndText style={{ gridArea: 'info' }}>
            <SInfoText primary>Identifier</SInfoText>
            <SInfoText>{bike.id}</SInfoText>

            <SInfoText primary>Location</SInfoText>
            <SInfoText>{bike.locationName}</SInfoText>

            <SInfoText primary>Status</SInfoText>
            <SInfoText>{bike.status}</SInfoText>

            <SInfoText primary>Battery</SInfoText>
            <SInfoText>{bike.battery}%</SInfoText>
          </SInfoWith2ColumnsForLabelAndText>

          {this.decideButton(bike.status)}

          {bike.issues && bike.issues.length > 0 && (
            <div style={{ margin: '16px', gridArea: 'issues', minWidth: '400px' }}>
              <h2 style={{ textAlign: 'center' }}>Issues</h2>
              <IssuesList issues={bike.issues} selectIssue={() => {}} />
            </div>
          )}
          <SLittleMap style={{ gridArea: 'map', alignSelf: 'center' }}>
            <Map
              style={{ width: '240px', height: '240px' }}
              google={google}
              zoom={17}
              zoomControl={false}
              mapTypeControl={false}
              fullscreenControl={false}
              initialCenter={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }}
              center={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }}
            >
              <Marker icon="/bike-icon-fa.png" position={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }} />
            </Map>
          </SLittleMap>
        </SBikeGrid>
      </SSingleScreen>
    );
  }
}

BikeSingle.propTypes = {
  ...BikesProps,
  google: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withBikes(GoogleApiWrapper({ apiKey: CONFIG.googleApiKey })(BikeSingle));
