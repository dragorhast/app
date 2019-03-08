import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import withPickup, { PickupProps } from '../shared/redux/containers/PickupPointsContainer';
import CONFIG from '../shared/constants/config';
import { mapCenter } from '../styles/constants';
import MapToListTabs from '../components/MapToListTabs';

class PickupsMap extends React.PureComponent {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  componentWillMount() {
    const { getPickupPoints } = this.props;
    getPickupPoints();
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }

  /**
   * Sets the state so that the InfoWindow
   * knows which marker to associate with
   * then makes the InfoWindow visible
   *
   * @param props
   * @param marker
   */
  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  /**
   * Closes the info window
   */
  onMapClick = () => {
    const { showingInfoWindow } = this.state;

    if (showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    const { smallScreen, google, pickups } = this.props;
    const { activeMarker, showingInfoWindow, selectedPlace } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {smallScreen && <MapToListTabs mapView linkToList="/pickups" />}
        <div style={{ flex: 1 }}>
          <Map google={google} zoom={15} initialCenter={mapCenter} onClick={this.onMapClick}>
            {pickups &&
              pickups.map(pickup => (
                <Marker
                  icon="/pickup-point-icon-fa.png"
                  key={pickup.pickupId}
                  id={pickup.pickupId}
                  name={pickup.name}
                  position={{ lat: pickup.coordinates.latitude, lng: pickup.coordinates.longitude }}
                  onClick={this.onMarkerClick}
                />
              ))}
            <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
              <div>
                <h3>{selectedPlace.name}</h3>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

PickupsMap.propTypes = {
  ...PickupProps,
  smallScreen: PropTypes.bool.isRequired,
  google: PropTypes.shape().isRequired,
};

export default withPickup(GoogleApiWrapper({ apiKey: CONFIG.googleApiKey })(PickupsMap));
