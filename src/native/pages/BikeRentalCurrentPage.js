/**
 * Page to display current rental
 *
 * Includes:
 * - Cost of rental so far
 * - Pickup Location
 * - Time been renting for <-- calculated on load
 * - Ability to lock / unlock bike
 * - Ability to put bike back
 * */
import React from 'react';
import Modal from 'react-native-modal';
import { Container, Content, Body, Button, Text, H1, H3, Toast } from 'native-base';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import StyledModal from '../components/styled/StyledModal';
import ModalConfirmationEndRental from '../components/ModalConifrmationEndRental';
import hoursAndMinutesBetween2Points from '../../util/hoursAndMinutesBetween2Times';
import { BikeRentalPropTypes } from '../../redux/reducers/bike-rental';

const StyledPriceText = styled.Text`
  color: blue;
  font-size: 24; // this is not an error
`;

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
   * Cancels a rental started by the user.
   * Same as return bike but there should be no charge
   * as it is under 15 minutes
   *
   * TODO link to API diff between cancellation + end rental, modal as well
   */
  cancelRental = () => {
    const { returnBike } = this.props;
    returnBike()
      .then(() => {
        Toast.show({
          text: 'Rental cancelled at no charge',
          type: 'success',
          position: 'top',
          duration: 5000,
        });
        Actions.home();
      })
      .catch(() => {
        Toast.show({
          text: "Oops. Couldn't cancel rental",
          buttonText: 'Okay',
          type: 'danger',
          position: 'top',
          duration: 5000,
        });
      });
  };

  /**
   * Render a cancel button if the bike rental is under 5 minutes.
   * Render's a cancel button if the bike is ableToBeReturned.
   * Render's an unclickable cancel button if bike is not within pickUpPoint
   */
  renderReturnButton = () => {
    const { rentalInfo } = this.props;
    const rentalStartWithin5Minutes = Math.abs(new Date() - rentalInfo.rentalStartTime) < 1000 * 60 * 5;

    // Cancel Button
    if (rentalInfo.withinPickUpPointGeo && rentalStartWithin5Minutes) {
      return (
        <Button large danger onPress={this.cancelRental}>
          <Text>CANCEL RENTAL</Text>
        </Button>
      );
    }
    // return button, clickable or not
    return (
      <Button
        primary
        large
        disabled={!rentalInfo.withinPickUpPointGeo}
        onPress={() => this.setState({ modal1PutBackInRackOpen: true })}
      >
        <Text>RETURN BIKE</Text>
      </Button>
    );
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
            <Text>{hoursAndMinutesBetween2Points(rentalInfo.rentalStartTime, new Date())}</Text>
            <Text>Time used so far</Text>
            <Text>Pick Up Location</Text>
            <Text>{rentalInfo.pickUpPoint}</Text>
            {this.renderReturnButton()}
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
    ...BikeRentalPropTypes,
  }).isRequired,
};

export default BikeRentalCurrentPage;
