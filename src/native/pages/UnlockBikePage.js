import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container, Content, Body, Button, Text } from 'native-base';
import QRScanner from '../components/QRScanner';

const Styles = StyleSheet.create({
  viewCenter: {
    flexDirection: 'column',
    flex: 1,
  },
  blackBody: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});

const UnlockBikePage = ({ sendBikeIDToServer }) => (
  <Container>
    {/* Content is the entire screen if flex is one */}
    <Content contentContainerStyle={Styles.viewCenter}>
      <Text>Something Here</Text>
      <Body style={Styles.blackBody}>
        <QRScanner onSuccessfulScan={sendBikeIDToServer} />
      </Body>
    </Content>
  </Container>
);

UnlockBikePage.propTypes = {
  sendBikeIDToServer: PropTypes.func,
};

// TODO remove this once made container
UnlockBikePage.defaultProps = {
  sendBikeIDToServer: () => {},
};

export default UnlockBikePage;
