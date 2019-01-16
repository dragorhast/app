/**
 * Page to display current rental
 *
 * Includes:
 * - Cost of rental so far
 * - Pickup Location
 * - Time been renting for <-- calculated on load
 * - Ability to lock / unlock bike
 * - Ability to put bike back
 *
 * */
import React from 'react';
import Modal from 'react-native-modal';
import { Container, Content, Body, Button, Text, H1, H2, H3, Toast } from 'native-base';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import StyledModal from '../components/styled/StyledModal';
import ModalConfirmationEndRental from '../components/ModalConifrmationEndRental';

const StyledPriceText = styled.Text`
  color: blue;
  font-size: 24; // this is not an error
`;

/**
 *
 * @param rentalStartTime
 * @returns minutesBeenRentingFor
 */
const getTimeBeenRentingFor = rentalStartTime => {
  const currentTime = new Date();
  const milliSecondsSoFar = currentTime - new Date(rentalStartTime);
  const hours = Math.floor(milliSecondsSoFar / (1000 * 60 * 60));
  const minutes = Math.round((milliSecondsSoFar / 1000) % 60);
  return hours ? `${hours} hrs ${minutes} mins` : `${minutes} mins`;
};

class BikeRentalCurrentPage extends React.Component {
  state = {
    modal2IsUserSure: false,
    modal1PutBackInRackOpen: false,
  };

  componentWillMount() {
    const { getRentalInfo, fetchBikeRentalOnLoad } = this.props;
    if (fetchBikeRentalOnLoad) getRentalInfo();
  }

  closeBothModals = () => {
    this.setState({ modal2IsUserSure: false, modal1PutBackInRackOpen: false });
  };

  /**
   * Modal that displays to the user how to
   * place the bike back in the rack properly
   */
  renderModalPutBackInRack = () => {
    // render loading whilst waiting for response from fetch
    const { modal1PutBackInRackOpen } = this.state;
    return (
      <Modal isVisible={modal1PutBackInRackOpen} onBackdropPress={this.closeBothModals}>
        <StyledModal>
          <H1>Is Bike back in rack?</H1>
          <H3>Place back in rack like this</H3>
          <H1>BIG IMAGE HERE</H1>
          <Button onPress={() => this.setState({ modal1PutBackInRackOpen: false, modal2IsUserSure: true })}>
            <Text>CONFIRM</Text>
          </Button>
        </StyledModal>
      </Modal>
    );
  };

  /**
   * Modal that displays to user final information
   * and asks for confirmation if they want to finish the rental
   *
   * Fetches data from api through getRentalInfo
   */

  render() {
    const { rentalInfo, getRentalInfo, returnBike } = this.props;
    const { modal2IsUserSure, modal1PutBackInRackOpen } = this.state;

    return (
      <Container>
        <Content>
          {modal1PutBackInRackOpen && this.renderModalPutBackInRack()}
          {modal2IsUserSure && (
            <ModalConfirmationEndRental
              isVisible={modal2IsUserSure}
              closeModals={this.closeBothModals}
              getRentalInfo={getRentalInfo}
              returnBike={returnBike}
              rentalInfo={rentalInfo}
            />
          )}
          <Body>
            <StyledPriceText>£{rentalInfo.costOfRentalSoFar / 100}</StyledPriceText>
            <Text>{rentalInfo.bikeID}</Text> <Text>Bike ID</Text>
            {/* TODO also check for hours */}
            <Text>{getTimeBeenRentingFor(rentalInfo.rentalStartTime)}</Text> <Text>Time used so far</Text>
            <Text>Pick Up Location</Text>
            <Text>{rentalInfo.pickUpPoint}</Text>
            {rentalInfo.ableToBeReturned && (
              <Button primary large onPress={() => this.setState({ modal1PutBackInRackOpen: true })}>
                <Text>RETURN BIKE</Text>
              </Button>
            )}
          </Body>
        </Content>
      </Container>
    );
  }
}

BikeRentalCurrentPage.propTypes = {
  fetchBikeRentalOnLoad: PropTypes.bool.isRequired,
  getRentalInfo: PropTypes.func.isRequired,
  returnBike: PropTypes.func.isRequired,
  rentalInfo: PropTypes.shape({
    bikeID: PropTypes.string,
    rentalStartTime: PropTypes.date,
    costOfRentalSoFar: PropTypes.number,
    rentalActive: PropTypes.bool,
    pickUpPoint: PropTypes.string,
    ableToBeReturned: PropTypes.bool,
  }).isRequired,
};

export default BikeRentalCurrentPage;
