import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Body, Button, H2, Item, Input, Text, Toast } from 'native-base';
import QRScanner from '../components/QRScanner';
// Hacky way of passing in the page as Layout props
import BikeRentalCurrentPage from './BikeRentalCurrentPage';

const Styles = StyleSheet.create({
  pageColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  qrScanner: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  body: {
    flexDirection: 'column',
    flex: 1,
  },
});

class BikeRentalStartPage extends React.Component {
  state = {
    bikeIdInput: '',
  };

  /**
   * Handles the changing of pages based on success or failure
   */
  sendBikeIDToServer = bikeId => {
    const { startRentalFromId } = this.props;
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

  render() {
    const { bikeIdInput } = this.state;
    return (
      <Container>
        {/* Content is the entire screen if flex = 1 */}
        <Content contentContainerStyle={Styles.pageColumn}>
          <H2>Scan QR Code to Start Rental</H2>
          <Body style={Styles.body}>
            <View style={Styles.qrScanner}>
              <QRScanner onSuccessfulScan={this.sendBikeIDToServer} />
            </View>
            <Item rounded>
              <Input
                placeholder="6 Digit Bike ID"
                value={bikeIdInput}
                onChangeText={input => this.setState({ bikeIdInput: input })}
                returnKeyType="go"
                onSubmitEditing={() => this.sendBikeIDToServer(bikeIdInput)}
              />
            </Item>
          </Body>
        </Content>
      </Container>
    );
  }
}

BikeRentalStartPage.propTypes = {
  startRentalFromId: PropTypes.func.isRequired,
};

export default BikeRentalStartPage;
