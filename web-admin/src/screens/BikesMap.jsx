import React from 'react';
// import PropTypes from 'prop-types';
import { Map, Marker } from 'google-react-maps';
import CONFIG from '../shared/constants/config';
import { mapConfigOptions, mapCenter } from '../styles/map';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';

class BikeMap extends React.PureComponent {
  // state = {
  //   idOfBikeWithWindowOpen: null,
  // };

  async componentWillMount() {
    const { fetchBikes } = this.props;
    await fetchBikes();
  }

  render() {
    const { bikes } = this.props;
    return (
      <Map
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
            <Marker coords={{ lat: bike.coordinates[1], lng: bike.coordinates[0] }} icon="/bike-icon-fa.png" />
          ))}
      </Map>
    );
  }
}

BikeMap.propTypes = {
  ...BikesProps,
};

export default withBikes(BikeMap);
