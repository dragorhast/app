import React from 'react';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import ROUTES from '../routes';

const Home = () => (
  <Screen>
    <Button onPress={() => Actions[ROUTES.RentalStart]()} large halfWid>
      <Text>RENT NOW</Text>
    </Button>
    <Button onPress={() => Actions[ROUTES.RentalInfo]()} large halfWid>
      <Text>CURRENT</Text>
    </Button>
    <Button onPress={() => Actions[ROUTES.PickupPoints]()} large halfWid>
      <Text>PICKUP PONTS</Text>
    </Button>
    <Button onPress={() => Actions[ROUTES.IssueReport]()} large danger halfWid>
      <Text>ISSUE</Text>
    </Button>
  </Screen>
);

export default Home;
