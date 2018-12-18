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

const UnlockBikePage = ({ startRentalFromId }) => {
  /**
   * Handles the changing of pages based on success or failure
   */
  const sendBikeIDToServer = bikeId => {
    startRentalFromId(bikeId)
      .then(res => {
        console.log(res);
        console.log('Move to success page');
        // Actions.bikeRentalSuccess();
      })
      .catch(err => {
        console.log('Failure flash');
        console.log(err);
        // flash an error message
      });
  };

  return (
    <Container>
      {/* Content is the entire screen if flex = 1 */}
      <Content contentContainerStyle={Styles.viewCenter}>
        <Text>Something Here</Text>
        <Body style={Styles.blackBody}>
          <QRScanner onSuccessfulScan={sendBikeIDToServer} />
        </Body>
      </Content>
    </Container>
  );
};

UnlockBikePage.propTypes = {
  startRentalFromId: PropTypes.func.isRequired,
};

export default UnlockBikePage;
