import React from 'react';
import { compose } from 'redux';
import { Button, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import ROUTES from '../routes';
import withCurrentRental, { RentalProps } from '../../shared/redux/containers/RentalInfoContainer';
import withStatus, { StatusProps } from '../../shared/redux/containers/StatusContainer';
import LoadingScreen from './LoadingScreen';
import { delay } from '../../shared/util';

class Home extends React.Component {
  async componentWillMount() {
    this.checkForCurrentRental();
    await this.checkForCurrentRental();
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
  withCurrentRental,
  withStatus
)(Home);
