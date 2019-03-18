import React from 'react';
import { Location, Permissions, MapView } from 'expo';
import { Content, Tabs, Tab, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import PickupPoint from '../components/PickupPoint';
import PickupSVG from '../../assets/pickup.svg';
import withPickups, { PickupProps } from '../../shared/redux/containers/PickupPointsContainer';
import ROUTES from '../routes';
import THEME from '../styles/styledComponentTheme';

class PickupPoints extends React.Component {
  static propTypes = {
    ...PickupProps,
  };

  state = {
    mapBottomPointVisible: false,
    mapBottomPoint: {},
  };

  async componentDidMount() {
    const { getPickupPoints } = this.props;

    await Permissions.askAsync(Permissions.LOCATION);
    const { coords } = await Location.getCurrentPositionAsync({});

    // getPickupPoints(coords);
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
                      coordinate={{ latitude: point.centerCoordinates[1], longitude: point.centerCoordinates[0] }}
                      title={point.name}
                      key={point.name}
                      onPress={() => this.makePointVisible(point)}
                    >
                      <PickupSVG width={32} height={32} style={{ color: THEME.stop1 }} />
                    </MapView.Marker>
                  ))}
              </MapView>
              {mapBottomPointVisible && (
                <PickupPoint point={mapBottomPoint} openReservation={this._moveToReservationCreate} />
              )}
            </View>
          </Tab>
        </Tabs>
      </Screen>
    );
  }
}

export default withPickups(PickupPoints);
