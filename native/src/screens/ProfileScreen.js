import React from 'react';
import { Actions } from 'react-native-router-flux';
import { H3, Button, Text } from 'native-base';
import { Screen, Spacer, CardMediumShadow } from '../styles';
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
        <CardMediumShadow padding={16} style={{ width: '80%', alignItems: 'center' }}>
          <H3>Payment Details</H3>

          <Spacer />

          <PaymentDetailsForm paymentDetails={paymentDetails} onChangeText={editSectionPayments} />
          {/* </View> */}

          <Spacer />

          <Button onPress={this.update}>
            <Text>Update</Text>
          </Button>
        </CardMediumShadow>
      </Screen>
    );
  }
}

ProfileScreen.propTypes = {
  ...PaymentProps,
};

export default withPaymentDetails(ProfileScreen);
