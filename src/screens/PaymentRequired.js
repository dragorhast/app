import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Button, Text, View } from 'native-base';
import { Screen, Spacer } from '../styles';
import PaymentDetailsForm from '../components/PaymentDetailsForm';
import ROUTES from '../routes';
import withPaymentDetails, { PaymentProps } from '../../shared/redux/containers/PaymentContainer';

class PaymentRequired extends React.PureComponent {
  update = async () => {
    const { setPaymentDetails, paymentDetails, callbackOnSuccessfulPaymentUpload } = this.props;
    try {
      await setPaymentDetails(paymentDetails);
      callbackOnSuccessfulPaymentUpload(); // Function must be passed when ever load page
    } catch (e) {
      console.log(e);
      Actions[ROUTES.Home]();
      return Promise.resolve();
    }
  };

  render() {
    const { paymentDetails, editSectionPayments } = this.props;
    return (
      <Screen>
        <View style={{ width: '80%', alignItems: 'center' }}>
          <Text>
            You won't be charged until you return the bike at the end of your rental but we need your details to make
            sure everything is okay!
          </Text>

          <Spacer />

          <PaymentDetailsForm paymentDetails={paymentDetails} onChangeText={editSectionPayments} />
        </View>

        <Spacer />

        <Button onPress={this.update}>
          <Text>Continue</Text>
        </Button>
      </Screen>
    );
  }
}

PaymentRequired.propTypes = {
  ...PaymentProps,
};

export default withPaymentDetails(PaymentRequired);
