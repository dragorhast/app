import React from 'react';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { H2, Button, Text, View } from 'native-base';
import { Screen, CardMediumShadow } from '../styles';
import ROUTES from '../routes';
import Loading from './LoadingScreen';
import Spacer from '../components/Spacer';
import { prettyDateTime } from '../../shared/util';
import withReservationCreation, {
  ReservationCreationProps,
} from '../../shared/redux/containers/ReservationCreationContainer';

/**
 * Screen for setting the date + time of reservation
 * plus asking the user for confirmation
 */
class ReservationCreate extends React.PureComponent {
  state = {
    isDatePickerVisible: false,
    changedDateAndTime: false,
  };

  _showDateTimePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = datetime => {
    const { setDateTimeReservationCreation } = this.props;
    setDateTimeReservationCreation(datetime);
    this.setState({ changedDateAndTime: true });
    this._hideDateTimePicker();
  };

  reserve = async () => {
    const { makeReservation } = this.props;
    const { changedDateAndTime } = this.state;

    const reserveNext30Minutes = !changedDateAndTime;
    try {
      await makeReservation(reserveNext30Minutes);
      Actions[ROUTES.ReservationDisplayWithBurger]();
    } catch (e) {
      if (e.message === 'NO PAYMENT METHOD') {
        Actions.replace(ROUTES.PaymentRequired, {
          callbackOnSuccessfulPaymentUpload: () => Actions.replace(ROUTES.ReservationCreation),
        });
        return;
      }
      Actions.replace(ROUTES.ReservationCreation); // makes it stay on page
    }
  };

  render() {
    const { reserveCreate } = this.props;
    const { isDatePickerVisible, changedDateAndTime } = this.state;

    if (!reserveCreate) return <Loading />;

    return (
      <Screen>
        <CardMediumShadow style={{ height: '90%', width: '90%' }}>
          {/* Pickup Point + Date text */}
          <View style={{ height: 128, justifyContent: 'space-between' }}>
            <Text>Selected</Text>
            <H2>{reserveCreate.pickupName}</H2>
            <Text>Date + Time</Text>
            {changedDateAndTime ? <H2>{prettyDateTime(reserveCreate.datetime)}</H2> : <H2>Next 30 minutes</H2>}
          </View>

          <Spacer />

          {/* Buttons */}
          <View style={{ flex: 1, width: '80%', justifyContent: 'flex-start', alignSelf: 'center' }}>
            <Button light onPress={this._showDateTimePicker}>
              <Text>Change reservation time</Text>
            </Button>

            <Spacer />

            <Text italic>
              {`We will ensure that there are enough bikes at the pickup point for the time you reserve.

Then you can just pick up any bike once you get there!`}
            </Text>

            {/* TODO add check that only shows 30 min button if bikes available at location */}
            <Button primary large onPress={this.reserve}>
              <Text>Confirm</Text>
            </Button>
          </View>
        </CardMediumShadow>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          date={reserveCreate.datetime}
          minimumDate={new Date()}
        />
      </Screen>
    );
  }
}

ReservationCreate.propTypes = {
  ...ReservationCreationProps,
};

export default withReservationCreation(ReservationCreate);
