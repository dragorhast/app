import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import CONFIG from '../shared/constants/config';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';
import {
  SSingleScreen,
  SSingleHeading,
  SInfoRowToColumn,
  SInfo,
  SInfoLabelAndText,
  SInfoLabelSmaller,
  SInfoText,
  SLittleMap,
} from '../styles/components/InfoSections';
import IssuesList from '../components/IssuesList';

class BikeSingle extends React.PureComponent {
  componentWillMount() {
    const { bike, fetchSingleBike, fetchBikeIssues, match } = this.props;
    if (!bike.id) fetchSingleBike(match.params.id);

    fetchBikeIssues(match.params.id);
  }

  render() {
    const { bike, google } = this.props;
    return (
      <SSingleScreen>
        <SSingleHeading>Bike Details</SSingleHeading>
        <SInfoRowToColumn>
          <SInfo>
            <SInfoLabelAndText>
              <SInfoLabelSmaller>Identifier</SInfoLabelSmaller>
              <SInfoText>{bike.id}</SInfoText>
            </SInfoLabelAndText>
            <SInfoLabelAndText>
              <SInfoLabelSmaller>Location</SInfoLabelSmaller>
              <SInfoText>{bike.locationName}</SInfoText>
            </SInfoLabelAndText>
            <SInfoLabelAndText>
              <SInfoLabelSmaller>Status</SInfoLabelSmaller>
              <SInfoText>{bike.status}</SInfoText>
            </SInfoLabelAndText>
            <SInfoLabelAndText>
              <SInfoLabelSmaller>Battery</SInfoLabelSmaller>
              <SInfoText>{bike.battery}%</SInfoText>
            </SInfoLabelAndText>

            {bike.issues && bike.issues.length > 0 && (
              <div style={{ margin: '16px' }}>
                <h2 style={{ textAlign: 'center' }}>Issues</h2>
                <IssuesList issues={bike.issues} selectIssue={() => {}} />
              </div>
            )}
          </SInfo>
          <SLittleMap>
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
        </SInfoRowToColumn>
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
