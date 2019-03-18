import React from 'react';
import { MapView } from 'expo';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import PickupPoint from '../components/PickupPoint';
import PickupSVG from '../../assets/pickup.svg';
import BikeSVG from '../../assets/bicycle.svg';
import withBikesAndPickups, { MapContainerProps } from '../../shared/redux/containers/MapContainer';
import ROUTES from '../routes';
import THEME from '../styles/styledComponentTheme';

class MapBikeAndPickups extends React.Component {
  state = {
    mapBottomPointVisible: false,
    mapBottomPoint: {},
  };

  async componentWillMount() {
    const { fetchPickups, fetchBikes } = this.props;
    fetchPickups();
    fetchBikes();
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
    const { pickups, bikes } = this.props;
    const { mapBottomPointVisible, mapBottomPoint } = this.state;
    return (
      <Screen>
        <View style={{ height: '100%', width: '100%' }}>
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
                  <PickupSVG width={32} height={32} color={THEME.stop1} />
                </MapView.Marker>
              ))}

            {bikes &&
              bikes.map(bike => (
                <MapView.Marker
                  coordinate={{ latitude: bike.coordinates[1], longitude: bike.coordinates[0] }}
                  title={bike.id}
                  key={bike.id}
                >
                  {console.log(bike)}
                  <BikeSVG width={32} height={32} color={THEME.font} />
                </MapView.Marker>
              ))}
          </MapView>
          {mapBottomPointVisible && (
            <PickupPoint point={mapBottomPoint} openReservation={this._moveToReservationCreate} />
          )}
        </View>
      </Screen>
    );
  }
}

MapBikeAndPickups.propTypes = {
  ...MapContainerProps,
};

export default withBikesAndPickups(MapBikeAndPickups);
