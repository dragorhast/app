import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, Body, Button, Text, Toast } from 'native-base';
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

const rentNowOrViewRental = bikeStatus => {
  if (bikeStatus)
    return (
      <Button dark large onPress={Actions.bikeRentalInfo}>
        <Text>CURRENT RENTAL</Text>
      </Button>
    );

  return (
    <Button primary large onPress={Actions.bikeRentalStart}>
      <Text>RENT NOW</Text>
    </Button>
  );
};

// more props will be passed as functions later in development
const Home = ({ bikeRental }) => (
  <Container>
    {/* Content is the entire screen if flex is one */}
    <Content contentContainerStyle={Styles.viewCenter}>
      <Body style={Styles.blackBody}>
        {rentNowOrViewRental(bikeRental.bikeID)}
        <Button bordered primary large onPress={Actions.profileHome}>
          <Text>TEMP PROFILE PAGE</Text>
        </Button>
      </Body>
    </Content>
  </Container>
);

Home.propTypes = {
  bikeRental: PropTypes.object.isRequired,
};

export default Home;
