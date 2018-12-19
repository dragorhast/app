import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Body, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';

const Styles = StyleSheet.create({
  viewCenter: {
    flexDirection: 'column',
    flex: 1,
  },
  blackBody: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

// more props will be passed as functions later in development
const Home = () => (
  <Container>
    {/* Content is the entire screen if flex is one */}
    <Content contentContainerStyle={Styles.viewCenter}>
      <Body style={Styles.blackBody}>
        <Button primary large onPress={Actions.bikeRentalStart}>
          <Text>RENT NOW</Text>
        </Button>
        <Button bordered primary large onPress={Actions.profileHome}>
          <Text>TEMP PROFILE PAGE</Text>
        </Button>
      </Body>
    </Content>
  </Container>
);

export default Home;
