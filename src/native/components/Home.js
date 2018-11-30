import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, Body, Button, Text } from 'native-base';

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
const Home = ({ logout }) => (
  <Container>
    {/* Content is the entire screen if flex is one */}
    <Content contentContainerStyle={Styles.viewCenter}>
      <Body style={Styles.blackBody}>
        <Button primary large style={Styles.buttonStyle}>
          <Text>RENT NOW</Text>
        </Button>
        <Button bordered primary large>
          <Text>VIEW LOCATIONS</Text>
        </Button>
      </Body>
    </Content>
  </Container>
);

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Home;
