import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, InfoWindow, Polygon } from 'google-maps-react';
import withPickup, { PickupProps } from '../shared/redux/containers/PickupPointsContainer';
import CONFIG from '../shared/constants/config';
import { mapCenter } from '../styles/constants';
import MapToListTabs from '../components/MapToListTabs';
import mapStyle from '../assets/maps-style';

/**
 * A quick function to create a (seemingly) random
 * but deterministic hue for a given pickup.
 */
function pickupColor(pickup) {
  const hue = (pickup.pickupId + 43517) ** 3 % 256;
  return `hsl(${hue}, 100%, 70%)`;
}

function getTopmostCoordinate(polygon) {
  if (!polygon.paths) return null;
  return polygon.paths.reduce((top, curr) => (curr.lat > top.lat ? curr : top), { lat: -999 });
}

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
   * then makes the InfoWindow visible.
   */
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
        {smallScreen && <MapToListTabs mapView linkToList="/pickups" />}
        <div style={{ flex: 1, position: 'relative' }}>
          <Map google={google} zoom={15} styles={mapStyle} initialCenter={mapCenter} onClick={this.onMapClick}>
            {pickups &&
              pickups.map(pickup => {
                const color = pickupColor(pickup);
                return (
                  <Polygon
                    key={pickup.pickupId}
                    paths={pickup.coordinates}
                    name={pickup.name}
                    strokeColor={color}
                    strokeOpacity={1}
                    strokeWeight={1}
                    fillColor={color}
                    fillOpacity={0.15}
                    onClick={this.onMarkerClick}
                  />
                );
              })}
            <InfoWindow position={getTopmostCoordinate(selectedPlace)} visible={showingInfoWindow}>
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
