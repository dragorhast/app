/**
 * Modal that displays to user final information
 * and asks for confirmation if they want to finish the rental
 *
 * Fetches data from api through getRentalInfo
 */
import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { Button, H1, H2, H3, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import StyledModal from './styled/StyledModal';

class ModalConfirmationEndRental extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModals: PropTypes.func.isRequired,
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

  componentWillMount() {
    const { getRentalInfo, rentalInfo } = this.props;
    getRentalInfo();
    console.log(rentalInfo);
  }

  confirmedEndRental = () => {
    const { returnBike, closeModals } = this.props;
    returnBike()
      .then(async ({ data }) => {
        await closeModals();
        // gets data from dispatch data because toast shows before state change
        Toast.show({
          text: `£${data.costChargedToCard / 100} charged to your account`,
          type: 'success',
          position: 'top',
          duration: 5000,
        });
        Actions.home();
        // Actions.bikeRentalEnd();
      })
      .catch(() => {
        closeModals();
        Toast.show({
          text: "Oops. Couldn't cancel rental",
          buttonText: 'Okay',
          type: 'danger',
          position: 'top',
          duration: 5000,
        });
      });
  };

  render() {
    const { isVisible, closeModals, rentalInfo } = this.props;
    return (
      <Modal isVisible={isVisible} onBackdropPress={closeModals}>
        <StyledModal>
          <H1>Confirmation Info</H1>
          {/* TODO insert proper times */}
          <H3>11:30 - 12:40</H3>
          <Text>Charged by the 15 minutes</Text>
          <H2>£{rentalInfo.costOfRentalSoFar / 100}</H2>
          <Button onPress={this.confirmedEndRental}>
            <Text>END RENTAL</Text>
          </Button>
        </StyledModal>
      </Modal>
    );
  }
}

export default ModalConfirmationEndRental;
