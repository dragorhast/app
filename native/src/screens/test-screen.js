import React, { Component } from 'react';
import { Screen } from '../styles';
import PaymentDetailsForm from '../components/PaymentDetailsForm';

export default class TestScreen extends Component {
  render() {
    return (
      <Screen>
        <PaymentDetailsForm paymentDetails={{ cardNumber: '', month: '', year: '', cvc: '' }} onChangeText={() => {}} />
      </Screen>
    );
  }
}
