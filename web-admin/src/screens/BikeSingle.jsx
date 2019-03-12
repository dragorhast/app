import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import CONFIG from '../shared/constants/config';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';
import {
  SSingleScreen,
  SSingleHeading,
  SInfoRowToColumn,
  SInfoWith2ColumnsForLabelAndText,
  SInfoText,
  SLittleMap,
} from '../styles/components/InfoSections';
import IssuesList from '../components/IssuesList';

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

  render() {
    const { bike, google } = this.props;
    return (
      <SSingleScreen>
        <SSingleHeading>Bike Details</SSingleHeading>
        <SInfoRowToColumn>
          <SInfoWith2ColumnsForLabelAndText>
            <SInfoText primary>Identifier</SInfoText>
            <SInfoText>{bike.id}</SInfoText>

            <SInfoText primary>Location</SInfoText>
            <SInfoText>{bike.locationName}</SInfoText>

            <SInfoText primary>Status</SInfoText>
            <SInfoText>{bike.status}</SInfoText>

            <SInfoText primary>Battery</SInfoText>
            <SInfoText>{bike.battery}%</SInfoText>
          </SInfoWith2ColumnsForLabelAndText>

          {bike.issues && bike.issues.length > 0 && (
            <div style={{ margin: '16px' }}>
              <h2 style={{ textAlign: 'center' }}>Issues</h2>
              <IssuesList issues={bike.issues} selectIssue={() => {}} />
            </div>
          )}
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
