import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker, InfoWindow } from 'google-maps-react';
import { Link } from 'react-router-dom';
import CONFIG from '../shared/constants/config';
import { mapCenter } from '../styles/map';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';
import { SSmallScreenTransition } from '../styles/commonStyles';

class BikeMap extends React.PureComponent {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  async componentWillMount() {
    const { fetchBikes } = this.props;
    await fetchBikes();
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
    const { bikes, smallScreen, google } = this.props;
    const { activeMarker, showingInfoWindow, selectedPlace } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {smallScreen && (
          <SSmallScreenTransition>
            <Link to="/bikes">
              <h2>List View</h2>
            </Link>
          </SSmallScreenTransition>
        )}
        <div style={{ flex: 1 }}>
          <Map google={google} zoom={15} initialCenter={mapCenter} onClick={this.onMapClick}>
            {bikes &&
              bikes.map(bike => (
                <Marker
                  icon="/bike-icon-fa.png"
                  key={bike.id}
                  id={bike.id}
                  bike={bike}
                  position={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }}
                  onClick={this.onMarkerClick}
                />
              ))}
            <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
              <div>
                <h3>{selectedPlace.bike && selectedPlace.bike.id}</h3>
                <h4>{selectedPlace.bike && selectedPlace.bike.locationName}</h4>
                <h4>{selectedPlace.bike && selectedPlace.bike.status}</h4>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

BikeMap.propTypes = {
  ...BikesProps,
  smallScreen: PropTypes.bool.isRequired,
  google: PropTypes.object.isRequired,
};

export default withBikes(GoogleApiWrapper({ apiKey: CONFIG.googleApiKey })(BikeMap));
