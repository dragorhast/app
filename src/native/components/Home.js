import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

const Styles = StyleSheet.create({
  viewCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// more props will be passed as functions later in development
const Home = ({ logout }) => (
  <Container>
    <Content contentContainerStyle={Styles.viewCenter}>
      <Button primary large>
        <Text>RENT NOW</Text>
      </Button>
      <Button primary large>
        <Text>VIEW LOCATIONS</Text>
      </Button>
      <Button primary large>
        <Text>VIEW BOOKINGS</Text>
      </Button>
    </Content>
  </Container>
);

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Home;
