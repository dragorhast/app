import React from 'react';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { H2, H3, Button, Text, View } from 'native-base';
import { Screen, CardMediumShadow } from '../styles';
import ROUTES from '../routes';
import Loading from './LoadingScreen';
import Spacer from '../components/Spacer';
import { prettyDateTime } from '../../shared/util';
import withReservationCreation, {
  ReservationCreationProps,
} from '../../shared/redux/containers/ReservationCreationContainer';
import { Firebase } from '../../shared/constants/firebase';
import { apiUserAbleToMakePayment } from '../../shared/api/tap2go';

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

  /**
   * Checks user is able to pay + routes to add payment
   * if isn't
   */
  reserve = async () => {
    const { makeReservation } = this.props;
    const { changedDateAndTime } = this.state;
    const reserveNext30Minutes = !changedDateAndTime;
    try {
      const authToken = await Firebase.auth().currentUser.getIdToken();
      const ableToPay = await apiUserAbleToMakePayment(authToken);
      if (ableToPay) {
        await makeReservation(reserveNext30Minutes);
        Actions[ROUTES.ReservationDisplayWithBurger]();
      } else {
        Actions.replace(ROUTES.PaymentRequired, {
          callbackOnSuccessfulPaymentUpload: () => Actions.replace(ROUTES.ReservationCreation),
        });
      }
    } catch (e) {
      console.log(e);
      return Promise.resolve();
    }
  };

  render() {
    const { reserveCreate } = this.props;
    const { isDatePickerVisible, changedDateAndTime } = this.state;

    if (!reserveCreate) return <Loading />;

    return (
      <Screen>
        <CardMediumShadow padding={32}>
          {/* Pickup Point + Date text */}
          <View style={{ justifyContent: 'space-between' }}>
            <Text>Selected</Text>
            <H2>{reserveCreate.pickupName}</H2>
            <Text>Date + Time</Text>
            {changedDateAndTime ? <H2>{prettyDateTime(reserveCreate.datetime)}</H2> : <H2>Next 30 minutes</H2>}
            <View style={{ height: 48, marginVertical: 16 }}>
              <Button light halfWid onPress={this._showDateTimePicker}>
                <Text>Change Time</Text>
              </Button>
            </View>

            <View style={{ height: 80, justifyContent: 'space-between', marginVertical: 16 }}>
              <H3 style={{ fontStyle: 'italic', textAlign: 'center' }}>
                Scan any bike at the station up to 30 minutes before to claim your reservation
              </H3>
              <Spacer size={8} />
              <Text center>We'll make sure there's a bike there for you and no one else can take it! ;)</Text>
            </View>
          </View>
        </CardMediumShadow>

        {/* TODO add check that only shows 30 min button if bikes available at location */}
        <Button primary onPress={this.reserve} style={{ marginVertical: 32 }}>
          <Text>Confirm</Text>
        </Button>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          date={reserveCreate.datetime}
          minimumDate={new Date()}
          minuteInterval={15}
        />
      </Screen>
    );
  }
}

ReservationCreate.propTypes = {
  ...ReservationCreationProps,
};

export default withReservationCreation(ReservationCreate);
