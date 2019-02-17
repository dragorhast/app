import React from 'react';
import { Actions } from 'react-native-router-flux';
import { H3, Button, Text, View } from 'native-base';
import { Screen, Spacer } from '../styles';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import ROUTES from '../routes';
import withPaymentDetails, { PaymentProps } from '../../shared/redux/containers/PaymentContainer';

class ProfileScreen extends React.PureComponent {
  update = async () => {
    const { setPaymentDetails, paymentDetails } = this.props;

    await setPaymentDetails(paymentDetails);
    Actions[ROUTES.Home]();
  };

  render() {
    const { paymentDetails, editSectionPayments } = this.props;
    return (
      <Screen>
        {/* Payment Details */}
        <View style={{ width: '80%', alignItems: 'center' }}>
          <H3 style={{ alignSelf: 'flex-start' }}>Payment Details</H3>
          <PaymentDetailsForm paymentDetails={paymentDetails} onChangeText={editSectionPayments} />
        </View>

        <Spacer />

        <Button onPress={this.update}>
          <Text>Update</Text>
        </Button>
      </Screen>
    );
  }
}

ProfileScreen.propTypes = {
  ...PaymentProps,
};

export default withPaymentDetails(ProfileScreen);
