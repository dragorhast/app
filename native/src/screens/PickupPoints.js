import React from 'react';
import { Location, Permissions, MapView } from 'expo';
import { Content, Tabs, Tab, Icon, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import PickupPoint from '../components/PickupPoint';
import withPickups, { PickupProps } from '../../shared/redux/containers/PickupPointsContainer';
import ROUTES from '../routes';

class PickupPoints extends React.Component {
  static propTypes = {
    ...PickupProps,
  };

  state = {
    locationPermission: false,
    coords: null /* Current Location */,
    mapBottomPointVisible: false,
    mapBottomPoint: {},
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
    this.makePointVisible = this.makePointVisible.bind(this);
  }

  makePointVisible = point => {
    this.setState({
      mapBottomPointVisible: true, // TODO refactor page related to this
      mapBottomPoint: point,
    });
  };

  _moveToReservationCreate = () => {
    Actions[ROUTES.ReservationCreation]();
  };

  render() {
    const { pickups } = this.props;
    const { mapBottomPointVisible, mapBottomPoint } = this.state;
    return (
      <Screen>
        {/* {loading && <LoadingIndicator />} */}
        <Tabs>
          <Tab heading="List">
            <Content>
              {pickups &&
                pickups.map(point => (
                  <PickupPoint point={point} key={point.name} openReservation={this._moveToReservationCreate} />
                ))}
            </Content>
          </Tab>
          <Tab heading="Map">
            {/* TODO test putting map in own component and not rendering until header is clicked to improve performance */}
            <View style={{ flex: 1 }}>
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
                      coordinate={point.coordinates}
                      title={point.name}
                      key={point.name}
                      onPress={() => this.makePointVisible(point)}
                    >
                      <Icon
                        name="ios-bicycle"
                        ios="ios-bicycle"
                        android="md-bicycle"
                        style={{ fontSize: 40, color: 'green' }}
                      />
                    </MapView.Marker>
                  ))}
              </MapView>
              {/* TODO make the transition where this enters nicer */}
              {/* TODO add a button to close the pop up */}
              {mapBottomPointVisible && <PickupPoint point={mapBottomPoint} />}
            </View>
          </Tab>
        </Tabs>
      </Screen>
    );
  }
}

export default withPickups(PickupPoints);
