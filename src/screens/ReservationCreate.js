import React from 'react';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { H2, Button, Text, View } from 'native-base';
import { Screen, CardMediumShadow, BreakLine } from '../styles';
import ROUTES from '../routes';
import Loading from './LoadingScreen';
import withReservationCreation, {
  ReservationCreationProps,
} from '../../shared/redux/containers/ReservationCreationContainer';
import Spacer from '../components/Spacer';

class ReservationCreate extends React.PureComponent {
  state = {
    isDatePickerVisible: false,
  };

  _showDateTimePicker = () => this.setState({ isDatePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDatePickerVisible: false });

  _handleDatePicked = datetime => {
    const { setDateTimeReservationCreation } = this.props;
    console.log('A date has been picked: ', datetime);
    setDateTimeReservationCreation(datetime);
    this._hideDateTimePicker();
  };

  reserve = async next30Minutes => {
    const { makeReservation } = this.props;

    makeReservation(next30Minutes)
      .then(() => Actions[ROUTES.Home]())
      .catch(() => Actions.back());
    // try {
    //   await makeReservation(next30Minutes);
    //   Actions[ROUTES.Home]();
    // } catch (e) {
    //   Actions.back();
    // }
  };

  render() {
    const { reserveCreate } = this.props;
    const { isDatePickerVisible } = this.state;

    if (!reserveCreate) return <Loading />;

    // TODO remove this out to a selector
    const date = new Date(reserveCreate.datetime);

    return (
      <Screen>
        <CardMediumShadow style={{ height: '90%', width: '90%' }}>
          {/* Pickup Point + Date text */}
          <View style={{ height: 128, justifyContent: 'space-between' }}>
            <Text>Pickup Point</Text>
            <H2>{reserveCreate.pickupName}</H2>
            <Text>Date + Time</Text>
            <H2>
              {date.getDay()}/{date.getMonth()}/{date.getFullYear()} - {date.getHours()}:{date.getMinutes()}
            </H2>
          </View>

          <Spacer />

          {/* Buttons */}
          <View style={{ flex: 1, width: '80%', justifyContent: 'flex-start', alignSelf: 'center' }}>
            <Button primary onPress={this._showDateTimePicker}>
              <Text>Change reservation time</Text>
            </Button>

            <Spacer />

            <Text italic>
              {`We will ensure that there are enough bikes at the pickup point for the time you reserve.

Then you can just pick up any bike once you get there!`}
            </Text>

            <BreakLine style={{ marginTop: 16, marginBottom: 16 }} />

            {/* TODO add check that only shows 30 min button if bikes available at location */}
            <Button light large onPress={() => this.reserve(true)}>
              <Text>Next 30 minutes</Text>
            </Button>

            <Button primary large onPress={this.reserve}>
              <Text>Confirm Time</Text>
            </Button>
          </View>
        </CardMediumShadow>
        <DateTimePicker
          isVisible={isDatePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode="datetime"
          date={date}
          is24Hour // only works android
        />
      </Screen>
    );
  }
}

ReservationCreate.propTypes = {
  ...ReservationCreationProps,
};

export default withReservationCreation(ReservationCreate);
