import React from 'react';
import { Location, Permissions, MapView } from 'expo';
import { Content, Tabs, Tab } from 'native-base';
import { Screen } from '../styles';
import LoadingIndicator from '../components/LoadingIndicator';
import PickupPoint from '../components/PickupPoint';
import withPickups, { PickupProps } from '../../shared/redux/containers/PickupPointsContainer';

class PickupPoints extends React.Component {
  static propTypes = {
    ...PickupProps,
  };

  state = {
    locationPermission: false,
    coords: null /* Current Location */,
  };

  async componentDidMount() {
    const { getPickupPoints } = this.props;

    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const { coords } = await Location.getCurrentPositionAsync({});
    this.setState({
      locationPermission: status === 'granted',
      coords,
    });

    getPickupPoints(coords);
  }

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
