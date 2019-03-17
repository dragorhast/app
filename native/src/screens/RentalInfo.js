import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Button, H1, Text, View, Icon } from 'native-base';
import styled from 'styled-components/native';
import { Screen, BreakLine, CardMediumShadow } from '../styles';
import { ModalEndRentalBackRack, ModalEndRentalConfirm } from '../components/Modals';
import { hoursAndMinutesSinceNow, minutesSinceTime } from '../../shared/util';
import ROUTES from '../routes';
import withHomeAndRental, { RentalProps } from '../../shared/redux/containers/HomeAndRentalContainer';
import THEME from '../styles/styledComponentTheme';

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
        <CardMediumShadow>
          <View padder>
            <H1>{`£${rentalInfo.costSoFar / 100}`}</H1>
            <Text>Cost so Far</Text>
          </View>

          {/* Time used so far */}
          <View padder>
            <Text>{hoursAndMinutesSinceNow(rentalInfo.startTime)}</Text>
            <Text>Time used so far</Text>
          </View>
        </CardMediumShadow>

        {/* Buttons */}
        <StyledButtonsView>
          {this.renderReturnButton()}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button danger onPress={Actions[ROUTES.IssueReport]} style={{ width: 64, height: 64, borderRadius: 64 }}>
              <Icon name="ios-alert" />
            </Button>

            {rentalInfo.bikeLocked ? (
              <Button
                large
                halfWid
                onPress={() => lockBike(false)}
                style={{ width: 64, height: 64, borderRadius: 64, backgroundColor: THEME.warning }}
              >
                <Icon name="ios-lock" />
              </Button>
            ) : (
              <Button
                large
                halfWid
                onPress={() => lockBike(true)}
                style={{ width: 64, height: 64, borderRadius: 64, backgroundColor: THEME.success }}
              >
                <Icon name="ios-unlock" />
              </Button>
            )}
          </View>
        </StyledButtonsView>
      </Screen>
    );
  }
}

RentalInfo.propTypes = {
  ...RentalProps,
};

export default withHomeAndRental(RentalInfo);
