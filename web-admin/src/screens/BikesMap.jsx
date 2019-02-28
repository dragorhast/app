import React from 'react';
import PropTypes from 'prop-types';
import { InfoWindow, Map, Marker } from 'google-react-maps';
import { Link } from 'react-router-dom';
import CONFIG from '../shared/constants/config';
import { mapConfigOptions, mapCenter } from '../styles/map';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';
import { SSmallScreenTransition } from '../styles/commonStyles';

class BikeMap extends React.PureComponent {
  // TODO make bike map + pickup map code more DRY
  state = {
    idOfBikeWithInfoOpen: null,
  };

  async componentWillMount() {
    const { fetchBikes } = this.props;
    await fetchBikes();
  }

  infoWindowCloseAll = () => {
    this.setState({ idOfBikeWithInfoOpen: null });
  };

  infoWindowOpen = id => {
    this.setState({ idOfBikeWithInfoOpen: id });
  };

  render() {
    const { bikes, smallScreen } = this.props;
    const { idOfBikeWithInfoOpen } = this.state;

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {smallScreen && (
          <SSmallScreenTransition>
            <Link to="/bikes">
              <h2>List View</h2>
            </Link>
          </SSmallScreenTransition>
        )}
        <Map
          style={{ flex: 1 }}
          api-key={CONFIG.googleApiKey}
          center={mapCenter}
          onMount={(map, maps) => {
            this.map = map; // Store the google map instance for custom actions. (Outside the react components.)
            this.maps = maps; // Store a reference to the google maps javascript api in case we need some of it's helper methods.
          }}
          optionsConstructor={maps =>
            // Options Constructor always has a this context of the options object. To override the default options do the following:
            Object.assign(this, mapConfigOptions(maps))
          }
        >
          {bikes &&
            bikes.map(bike => (
              <Marker
                coords={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }}
                icon="/bike-icon-fa.png"
                onClick={() => this.infoWindowOpen(bike.id)}
              >
                <InfoWindow open={idOfBikeWithInfoOpen === bike.id} onCloseClick={this.infoWindowCloseAll}>
                  <div>This marker has an icon image.</div>
                </InfoWindow>
              </Marker>
            ))}
        </Map>
      </div>
    );
  }
}

BikeMap.propTypes = {
  ...BikesProps,
  smallScreen: PropTypes.bool.isRequired,
};

export default withBikes(BikeMap);
