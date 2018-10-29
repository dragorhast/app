import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Button, Text } from 'native-base';
import styled from 'styled-components/native';

// more props will be passed as functions later in development
const Home = ({ logout }) => (
  <Container>
    <Content>
      <Button primary large>
        <Text>RENT NOW</Text>
      </Button>
    </Content>
  </Container>
);

Home.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Home;
