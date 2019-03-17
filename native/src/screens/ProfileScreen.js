import React from 'react';
import { Actions } from 'react-native-router-flux';
import { H3, Button, Text } from 'native-base';
import { Alert } from 'react-native';
import { Screen, Spacer, CardMediumShadow } from '../styles';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import ROUTES from '../routes';
import withProfile, { ProfileProps } from '../../shared/redux/containers/ProfileContainer';

class ProfileScreen extends React.PureComponent {
  update = async () => {
    const { setPaymentDetails, paymentDetails } = this.props;

    await setPaymentDetails(paymentDetails);
    Actions[ROUTES.Home]();
  };

  deleteAccountAlert = () => {
    // Works on both iOS and Android
    Alert.alert(
      'Right to be forgotten',
      'All of your data will be delete.\n\nAre you sure you want to proceed?',
      [
        {
          text: 'NO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'YES', onPress: () => this.deleteAccount() },
      ],
      { cancelable: true }
    );
  };

  deleteAccount = async () => {
    const { userDelete } = this.props;
    try {
      await userDelete();
    } catch (e) {
      console.log(e);
      return Promise.resolve();
    }
  };

  render() {
    const { paymentDetails, editSectionPayments } = this.props;
    return (
      <Screen>
        {/* Payment Details */}
        <CardMediumShadow padding={16} style={{ alignItems: 'center' }}>
          <H3>Payment Details</H3>

          <Spacer />

          <PaymentDetailsForm paymentDetails={paymentDetails} onChangeText={editSectionPayments} />
          {/* </View> */}

          <Spacer />
        </CardMediumShadow>

        <Button halfWid onPress={this.update}>
          <Text>Update</Text>
        </Button>

        <Button halfWid danger onPress={this.deleteAccountAlert}>
          <Text>Delete Account</Text>
        </Button>
      </Screen>
    );
  }
}

ProfileScreen.propTypes = {
  ...ProfileProps,
};

export default withProfile(ProfileScreen);
