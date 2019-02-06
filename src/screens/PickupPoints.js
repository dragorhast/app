import React from 'react';
import PropTypes from 'prop-types';
import { Location, Permissions, MapView, Marker } from 'expo';
import { Content, Text, View, Tabs, Tab } from 'native-base';
import { Screen } from '../styles';
import LoadingIndicator from '../components/LoadingIndicator';
import PickupPoint from '../components/PickupPoint';
import { PickupPropTypes } from '../../shared/redux/ducks/pickups';
import withPickups from '../../shared/redux/containers/PickupPointsContainer';

class PickupPoints extends React.Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    getPickupPoints: PropTypes.func.isRequired,
    pickups: PropTypes.arrayOf(PropTypes.shape({ ...PickupPropTypes })).isRequired,
  };

  state = {
    locationPermission: false,
    currentLocation: null,
  };

  async componentDidMount() {
    const { getPickupPoints } = this.props;

    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const { coords } = await Location.getCurrentPositionAsync({});
    this.setState({
      locationPermission: status === 'granted',
      currentLocation: coords,
    });

    getPickupPoints();
  }

  // TODO add get current location

  render() {
    const { loading, pickups } = this.props;
    return (
      <Screen>
        {loading && <LoadingIndicator />}
        <Tabs>
          <Tab heading="List">
            <Content>{pickups && pickups.map(point => <PickupPoint point={point} key={point.name} />)}</Content>
          </Tab>
          <Tab heading="Map">
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 55.949159,
                longitude: -3.199293,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {pickups &&
                pickups.map(point => (
                  <MapView.Marker
                    coordinate={{ latitude: point.coordinates[0], longitude: point.coordinates[1] }}
                    key={point.name}
                  />
                ))}
            </MapView>
          </Tab>
        </Tabs>
      </Screen>
    );
  }
}

export default withPickups(PickupPoints);
