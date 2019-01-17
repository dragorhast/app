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
import timeFromDate from '../../util/timeFromDate';
import { BikeRentalPropTypes } from '../../redux/reducers/bike-rental';

class ModalConfirmationEndRental extends React.Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    closeModals: PropTypes.func.isRequired,
    getRentalInfo: PropTypes.func.isRequired,
    returnBike: PropTypes.func.isRequired,
    rentalInfo: PropTypes.shape({
      ...BikeRentalPropTypes,
    }).isRequired,
  };

  componentWillMount() {
    const { getRentalInfo } = this.props;
    getRentalInfo();
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
    const dateRentalStart = new Date(rentalInfo.rentalStartTime);
    const dateNow = new Date();
    return (
      <Modal isVisible={isVisible} onBackdropPress={closeModals}>
        <StyledModal>
          <H1>Confirmation Info</H1>
          {/* TODO insert proper times */}
          <H3>
            {timeFromDate(dateRentalStart)} - {timeFromDate(dateNow)}
          </H3>
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
