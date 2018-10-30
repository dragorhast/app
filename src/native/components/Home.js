import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Button, Text } from 'native-base';

const Styles = StyleSheet.create({
  viewCenter: {
    backgroundColor: 'blue',
    color: 'green',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

// more props will be passed as functions later in development
const Home = ({ logout }) => (
  <Container>
    <Content>
      <View styles={Styles.viewCenter}>
        <Button primary large>
          <Text>RENT NOW</Text>
        </Button>
      </View>
    </Content>
  </Container>
);

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Home;
