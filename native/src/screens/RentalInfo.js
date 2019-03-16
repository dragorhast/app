import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Button, H1, Text, View } from 'native-base';
import styled from 'styled-components/native';
import { Screen, BreakLine } from '../styles';
import { ModalEndRentalBackRack, ModalEndRentalConfirm } from '../components/Modals';
import { hoursAndMinutesSinceNow, minutesSinceTime } from '../../shared/util';
import ROUTES from '../routes';
import withCurrentRental, { RentalProps } from '../../shared/redux/containers/RentalInfoContainer';

const StyledButtonsView = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  margin: 16px;
`;

class RentalInfo extends React.Component {
  state = {
    modal1PutBackInRack: false,
    modal2IsUserSure: false,
  };

  componentDidMount() {
    const { fetchInfoOnLoad, getRentalInfo } = this.props;
    if (fetchInfoOnLoad) {
      getRentalInfo();
    }

    this.closeBothModal = this.closeBothModal.bind(this);
    this.openSecondModal = this.openSecondModal.bind(this);
    this.confirmedEndRental = this.confirmedEndRental.bind(this);
  }

  /**
   * Sets both modal displays to false
   */
  closeBothModal = () => {
    this.setState({
      modal1PutBackInRack: false,
      modal2IsUserSure: false,
    });
  };

  openFirstModal = () => {
    this.setState({
      modal1PutBackInRack: true,
      modal2IsUserSure: false,
    });
  };

  /**
   * Closes the first modal and opens
   * the second one
   */
  openSecondModal = async () => {
    await this.setState({
      modal1PutBackInRack: false,
    });

    this.setState({ modal2IsUserSure: true });
  };

  /**
   * Cancels rental without a charge
   *
   * Only available with 5 minutes of starting rental
   * @returns {Promise<void>}
   */
  cancelRental = async () => {
    const { returnRental } = this.props;
    try {
      const cancel = true;
      await returnRental(cancel);
      return Actions[ROUTES.Home]();
    } catch (e) {
      // Handled by redux
      return Promise.resolve();
    }
  };

  /**
   * Ends rental after confirmation
   *
   * @returns {Promise<*>}
   */
  confirmedEndRental = async () => {
    const { returnRental } = this.props;
    try {
      await returnRental();
      return Actions[ROUTES.Home]();
    } catch (e) {
      // Handled by redux
      return Promise.resolve();
    }
  };

  /**
   * Returns Cancel Button if rental < 5 minutes old
   * Returns Return Button disabled if ableToBeReturned = False
   */
  renderReturnButton = () => {
    const { rentalInfo } = this.props;
    const rentalStartWithin5Minutes = minutesSinceTime(rentalInfo.startTime) < 5;

    // Cancel Button
    if (rentalInfo.ableToBeReturned && rentalStartWithin5Minutes) {
      return (
        <Button large danger onPress={this.cancelRental}>
          <Text>Cancel Rental</Text>
        </Button>
      );
    }

    return (
      <Button primary large disabled={!rentalInfo.ableToBeReturned} onPress={this.openFirstModal}>
        <Text>Return Bike</Text>
      </Button>
    );
  };

  render() {
    const { rentalInfo, getRentalInfo, lockBike } = this.props;
    const { modal1PutBackInRack, modal2IsUserSure } = this.state;

    if (modal1PutBackInRack) {
      return (
        <ModalEndRentalBackRack
          nextPage={this.openSecondModal}
          close={this.closeBothModal}
          isVisible={modal1PutBackInRack}
        />
      );
    }

    if (modal2IsUserSure) {
      return (
        <ModalEndRentalConfirm
          close={this.closeBothModal}
          rentalInfo={rentalInfo}
          endRental={this.confirmedEndRental}
          isVisible={modal2IsUserSure}
          getRentalInfo={getRentalInfo}
        />
      );
    }

    return (
      <Screen>
        {/* Cost so far */}
        <View padder>
          <H1>{`£${rentalInfo.costSoFar / 100}`}</H1>
          <Text>Cost so Far</Text>
        </View>

        {/* Time used so far */}
        <View padder>
          <Text>{hoursAndMinutesSinceNow(rentalInfo.startTime)}</Text>
          <Text>Time used so far</Text>
        </View>

        <BreakLine width="75%" />

        {/* Buttons */}
        <StyledButtonsView>
          {this.renderReturnButton()}
          <Button danger large onPress={Actions[ROUTES.IssueReport]}>
            <Text>Report Issue</Text>
          </Button>

          {rentalInfo.bikeLocked ? (
            <Button secondary large onPress={() => lockBike(false)}>
              <Text>Unlock Bike</Text>
            </Button>
          ) : (
            <Button primary large onPress={() => lockBike(true)}>
              <Text>Lock Bike</Text>
            </Button>
          )}
        </StyledButtonsView>
      </Screen>
    );
  }
}

RentalInfo.propTypes = {
  ...RentalProps,
};

export default withCurrentRental(RentalInfo);
