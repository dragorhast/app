import React from 'react';
import { Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Screen } from '../styles';
import ROUTES from '../routes';

const Home = () => (
  <Screen>
    <Button onPress={() => Actions[ROUTES.RentalStart]()} large>
      <Text>RENT NOW</Text>
    </Button>
  </Screen>
);

export default Home;
