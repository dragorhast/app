import React from 'react';
import { Permissions, Location } from 'expo';
import { compose } from 'redux';
import { Button, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import ROUTES from '../routes';
import withHomeAndRental, { RentalProps } from '../../shared/redux/containers/HomeAndRentalContainer';
import withStatus, { StatusProps } from '../../shared/redux/containers/StatusContainer';
import LoadingScreen from './LoadingScreen';
import { delay } from '../../shared/util';
import IntroSlideshow from './IntroSlideshow';

class Home extends React.Component {
  state = {
    locationPermission: false,
    coords: null /* Current Location */,
  };

  async componentWillMount() {
    this.closestBike = this.closestBike.bind(this);
    this.checkForCurrentRental();
  }

  /**
   * Fetches users current location
   */
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    const { coords } = await Location.getCurrentPositionAsync({});
    this.setState({
      locationPermission: status === 'granted',
      coords,
    });
  }

  checkForCurrentRental() {
    const { getRentalInfo, reduxLoading } = this.props;
    if (!reduxLoading) {
      try {
        getRentalInfo();
      } catch (e) {
        console.log(e);
        return Promise.resolve();
      }
    }
  }

  async showErrorOrSuccessMessage() {
    const { reduxError, reduxSuccess, clearStatus } = this.props;
    if (reduxError || reduxSuccess) {
      Toast.show({
        position: 'top',
        duration: 5000,
        buttonText: 'okay',
        type: reduxError ? 'danger' : 'success',
        text: reduxError || reduxSuccess,
      });
      await delay(5000);
      clearStatus();
    }
  }

  async closestBike() {
    const { fetchClosestBike } = this.props;
    const { coords, locationPermission } = this.state;

    if (locationPermission) {
      await fetchClosestBike(coords);
      Actions[ROUTES.ClosestBike]();
      return Promise.resolve();
    }

    Toast.show({
      position: 'top',
      duration: 5000,
      buttonText: 'okay',
      type: 'danger',
      text: 'Must give Tap2Go Location permissions',
    });
  }

  render() {
    const { rentalInfo, reduxLoading } = this.props;
    if (reduxLoading) return <LoadingScreen />;
    return (
      <Screen>
        {rentalInfo.bikeId ? (
          <Button light onPress={() => Actions[ROUTES.RentalInfo]()} large halfWid>
            <Text>CURRENT</Text>
          </Button>
        ) : (
          <Button onPress={() => Actions[ROUTES.RentalStart]()} large halfWid>
            <Text>RENT NOW</Text>
          </Button>
        )}

        <Button onPress={this.closestBike} large halfWid>
          <Text>Closest Bike</Text>
        </Button>

        <Button onPress={() => Actions.push(ROUTES.PickupPoints)} large halfWid>
          <Text>PICKUP POINTS</Text>
        </Button>
        <Button onPress={() => Actions[ROUTES.IssueReport]()} large danger halfWid>
          <Text>ISSUE</Text>
        </Button>
        <Button onPress={() => Actions[ROUTES.ReservationsUpcoming]()} large light halfWid>
          <Text>RESERVATIONS</Text>
        </Button>
      </Screen>
    );
  }
}

Home.propTypes = {
  ...RentalProps,
  ...StatusProps,
};

export default compose(
  withHomeAndRental,
  withStatus
)(Home);
