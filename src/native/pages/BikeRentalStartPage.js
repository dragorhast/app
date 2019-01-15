import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import { Container, Content, Body, Button, H2, Text, Toast } from 'native-base';
import QRScanner from '../components/QRScanner';
// Hacky way of passing in the correct props including this
import BikeRentalCurrentPage from './BikeRentalCurrentPage';

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

const BikeRentalStartPage = ({ startRentalFromId }) => {
  /**
   * Handles the changing of pages based on success or failure
   */
  const sendBikeIDToServer = bikeId => {
    console.log('Button works');
    startRentalFromId(bikeId)
      .then(() => {
        // This is a hacky way of passing in the correct props - without it here it won't load from routes/index
        Actions.replace('bikeRentalInfo', { Layout: BikeRentalCurrentPage, fetchBikeRentalOnLoad: false });
      })
      .catch(() => {
        // Flash generic message
        Toast.show({
          text: "Oops. Couldn't start rental",
          buttonText: 'Okay',
          type: 'danger',
          position: 'top',
          duration: 5000,
        });
      });
  };

  return (
    <Container>
      {/* Content is the entire screen if flex = 1 */}
      <Content contentContainerStyle={Styles.viewCenter}>
        <H2>Scan QR Code to Start Rental</H2>
        <Button onPress={() => sendBikeIDToServer('123456')}>
          <Text>TEST SCAN BIKE</Text>
        </Button>
        <Body style={Styles.blackBody}>
          <QRScanner onSuccessfulScan={sendBikeIDToServer} />
        </Body>
      </Content>
    </Container>
  );
};

BikeRentalStartPage.propTypes = {
  startRentalFromId: PropTypes.func.isRequired,
};

export default BikeRentalStartPage;
