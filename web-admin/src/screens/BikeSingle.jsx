import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import styled from 'styled-components';
import CONFIG from '../shared/constants/config';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';
import { SSingleScreen, SInfoTable } from '../styles/components/InfoSections';
import IssuesList from '../components/IssuesList';
import { BikeIdentifier } from '../components/BikeIdentifier';
import { SButton } from '../styles/components/Common';

const SCirculationButton = styled(SButton)`
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
    const { putBikeInCirculation, bike } = this.props;
    switch (status) {
      // Can be put in to circulation
      case 'Out of Circ':
        return (
          <SCirculationButton primary onClick={() => putBikeInCirculation(bike.id, true)}>
            Put in to Circulation
          </SCirculationButton>
        );
      // Can be taken out of circulation
      case 'Available' || 'Broken' || 'Needs Serviced':
        return (
          <SCirculationButton danger onClick={() => putBikeInCirculation(bike.id, false)}>
            Take out of Circulation
          </SCirculationButton>
        );
      case 'Rented':
      default:
        return <SCirculationButton disabled>Put in to Circulation</SCirculationButton>;
    }
  };

  render() {
    const { bike, google } = this.props;
    return (
      <SSingleScreen>
        <section style={{ display: 'flex', flexDirection: 'row' }}>
          <div>
            <BikeIdentifier style={{ marginBottom: '1em' }} identifier={bike.id} />
            <div
              style={{
                padding: '0.4em 0.6em',
              }}
            >
              <SInfoTable>
                <tr>
                  <td>Location</td>
                  <td>{bike.locationName}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>{bike.status}</td>
                </tr>
                <tr>
                  <td>Battery</td>
                  <td>{bike.battery}%</td>
                </tr>
              </SInfoTable>
            </div>
          </div>
          <div style={{ flex: 1, position: 'relative', marginLeft: '2em', width: '250px' }}>
            <Map
              google={google}
              zoom={17}
              zoomControl={false}
              mapTypeControl={false}
              fullscreenControl={false}
              initialCenter={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }}
              center={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }}
            >
              <Marker
                icon={{
                  url: '/bike marker@0.5x.png',
                  scaledSize: new google.maps.Size(/* preserving the aspect ratio */ 3.2, 4.34, 'em', 'em'),
                }}
                position={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }}
              />
            </Map>
          </div>
        </section>
        <div style={{ margin: '16px' }}>
          <h2 style={{ textAlign: 'center' }}>Issues</h2>
          <IssuesList issues={bike.issues} selectIssue={() => {}} />
        </div>
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
