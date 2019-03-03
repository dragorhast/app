import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import CONFIG from '../shared/constants/config';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';

const SBikeSingle = styled.div`
  padding: 32px;
  width: 80%;

  @media screen and (max-width: 999px) {
    width: 90%;
  }
`;

const SInfoAndMap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: 999px) {
    flex-direction: column;
  }
`;

const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 16px;
`;

const SInfoLabelAndText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const SInfoLabel = styled.span`
  font-size: 32px;
  width: 160px;
`;

const SInfoText = styled.span`
  font-size: 32px;
`;

const SLittleMap = styled.div`
  width: 240px;
  height: 240px;
`;

class BikeSingle extends React.PureComponent {
  render() {
    const { bike, google } = this.props;
    return (
      <SBikeSingle>
        <h1 style={{ textAlign: 'center' }}>Bike Details</h1>
        <SInfoAndMap>
          <SInfo>
            <SInfoLabelAndText>
              <SInfoLabel>Identifier</SInfoLabel>
              <SInfoText>{bike.id}</SInfoText>
            </SInfoLabelAndText>
            <SInfoLabelAndText>
              <SInfoLabel>Location</SInfoLabel>
              <SInfoText>{bike.locationName}</SInfoText>
            </SInfoLabelAndText>
            <SInfoLabelAndText>
              <SInfoLabel>Status</SInfoLabel>
              <SInfoText>{bike.status}</SInfoText>
            </SInfoLabelAndText>
            <SInfoLabelAndText>
              <SInfoLabel>Battery</SInfoLabel>
              <SInfoText>{bike.battery}%</SInfoText>
            </SInfoLabelAndText>
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
        </SInfoAndMap>
      </SBikeSingle>
    );
  }
}

BikeSingle.propTypes = {
  ...BikesProps,
  google: PropTypes.object.isRequired,
};

export default withBikes(GoogleApiWrapper({ apiKey: CONFIG.googleApiKey })(BikeSingle));
