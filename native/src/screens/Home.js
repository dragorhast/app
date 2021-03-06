import React from 'react';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import ROUTES from '../routes';
import withCurrentRental, { RentalProps } from '../../shared/redux/containers/RentalInfoContainer';

class Home extends React.Component {
  async componentDidMount() {
    const { getRentalInfo } = this.props;
    try {
      getRentalInfo();
    } catch (e) {
      console.log(e);
      return Promise.resolve();
    }
  }

  render() {
    const { rentalInfo } = this.props;
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
};

export default withCurrentRental(Home);
