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
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { Container, Content, Body, Button, Text, H1, H2, H3 } from 'native-base';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import StyledModal from '../components/styled/StyledModal';

const StyledPriceText = styled.Text`
  color: blue;
  font-size: 24; // this is not an error
`;

/**
 *
 * @param rentalStartTime
 * @returns minutesBeenRentingFor
 */
// TODO change to hours been renting
const getMinutesBeenRentingFor = rentalStartTime => {
  const currentTime = new Date();
  const milliSecondsSoFar = currentTime - new Date(rentalStartTime);
  return Math.round(milliSecondsSoFar / (1000 * 60));
};

class BikeRentalCurrentPage extends React.Component {
  state = {
    modal2AreSureOpen: false,
    modal1PutBackInRackOpen: false,
  };

  componentWillMount() {
    const { getRentalInfo, fetchBikeRentalOnLoad } = this.props;
    if (fetchBikeRentalOnLoad) getRentalInfo();
  }

  /**
   * Handles ending the rental after modal 2
   *
   * Success:
   * - flash green toast <-- on next page
   * - move to succesfuly completed page
   *
   * Error:
   * - set state to not show modal
   * - flash red roast
   */
  confirmedEndRental = () => {
    const { returnBike } = this.props;

    returnBike()
      .then(() => {})
      .catch(() => {});
  };

  /**
   * Modal that displays to the user how to
   * place the bike back in the rack properly
   */
  renderModalPutBackInRack = () => {
    // render loading whilst waiting for response from fetch
    const { modal1PutBackInRackOpen } = this.state;
    return (
      <Modal
        isVisible={modal1PutBackInRackOpen}
        onBackdropPress={() => this.setState({ modal2AreSureOpen: false, modal1PutBackInRackOpen: false })}
      >
        <StyledModal>
          <H1>Is Bike back in rack?</H1>
          <H3>Place back in rack like this</H3>
          <H1>BIG IMAGE HERE</H1>
          <Button onPress={() => this.setState({ modal1PutBackInRackOpen: false, modal2AreSureOpen: true })}>
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
  renderModalAreSure = () => {
    const { modal2AreSureOpen } = this.state;
    const { getRentalInfo, rentalInfo } = this.props;
    getRentalInfo();
    return (
      <Modal
        isVisible={modal2AreSureOpen}
        onBackdropPress={() => this.setState({ modal2AreSureOpen: false, modal1PutBackInRackOpen: false })}
      >
        <StyledModal>
          <H1>Are you sure?</H1>
          <H3>11:30 - 12:40</H3>
          <Text>Charged by the 15 minutes - make italic</Text>
          <H2>{rentalInfo.costOfRentalSoFar}</H2>
          <Button onPress={this.confirmedEndRental}>
            <Text>END RENTAL</Text>
          </Button>
        </StyledModal>
      </Modal>
    );
  };

  render() {
    const { rentalInfo } = this.props;
    const { modal2AreSureOpen, modal1PutBackInRackOpen } = this.state;

    return (
      <Container>
        <Content>
          {modal1PutBackInRackOpen && this.renderModalPutBackInRack()}
          {modal2AreSureOpen && this.renderModalAreSure()}
          <Body>
            <StyledPriceText>{rentalInfo.costOfRentalSoFar}</StyledPriceText>
            <Text>{rentalInfo.bikeID}</Text> <Text>Bike ID</Text>
            {/* TODO also check for hours */}
            <Text>{getMinutesBeenRentingFor(rentalInfo.rentalStartTime)}</Text> <Text>Time used so far</Text>
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
