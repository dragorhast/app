import React from 'react';
import PropTypes from 'prop-types';
import { Map, Marker, InfoWindow } from 'google-react-maps';
import { Link } from 'react-router-dom';
import withPickup, { PickupProps } from '../shared/redux/containers/PickupPointsContainer';
import CONFIG from '../shared/constants/config';
import { mapConfigOptions, mapCenter } from '../styles/map';
import { SSmallScreenTransition } from '../styles/commonStyles';

class PickupsMap extends React.PureComponent {
  // TODO make pickup + bike maps more DRY
  state = {
    idOfOPickupWithInfoOpen: null,
  };

  componentWillMount() {
    const { getPickupPoints } = this.props;
    getPickupPoints();
    this.infoWindowCloseAll = this.infoWindowCloseAll.bind(this);
    this.infoWindowOpen = this.infoWindowOpen.bind(this);
  }

  infoWindowCloseAll = () => {
    this.setState({ idOfOPickupWithInfoOpen: null });
  };

  infoWindowOpen = id => {
    this.setState({ idOfOPickupWithInfoOpen: id });
  };

  render() {
    const { pickups, smallScreen } = this.props;
    const { idOfOPickupWithInfoOpen } = this.state;

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
          api-key={CONFIG.googleApiKey}
          style={{ flex: 1 }}
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
          {pickups &&
            pickups.map(pickup => (
              <Marker
                coords={{ lat: pickup.coordinates.latitude, lng: pickup.coordinates.longitude }}
                icon="/pickup-point-icon-fa.png"
                onClick={() => this.infoWindowOpen(pickup.pickupId)}
              >
                <InfoWindow open={idOfOPickupWithInfoOpen === pickup.pickupId} onCloseClick={this.infoWindowCloseAll}>
                  <div>This marker has an icon image.</div>
                </InfoWindow>
              </Marker>
            ))}
        </Map>
      </div>
    );
  }
}

PickupsMap.propTypes = {
  ...PickupProps,
  smallScreen: PropTypes.bool.isRequired,
};

export default withPickup(PickupsMap);
