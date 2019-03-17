import React from 'react';
import PropTypes from 'prop-types';
import { View, Item, Label, Input } from 'native-base';
import { PaymentPropTypes } from '../../shared/redux/ducks/payment';
import { Spacer, StyledInline } from '../styles';

/**
 * Component that returns a view with
 * the inputs for:
 * - Card number
 * - month + year
 * - CVC
 */

const PaymentDetailsForm = ({ paymentDetails, onChangeText }) => {
  return (
    <View style={{ width: '80%' }}>
      <Item floatingLabel>
        <Label>Card Number</Label>
        <Input
          value={paymentDetails.cardNumber}
          onChangeText={text => onChangeText({ cardNumber: text })}
          maxLength={16}
        />
      </Item>

      <Spacer />

      <StyledInline>
        <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
          <Item floatingLabel style={{ width: 48 }}>
            <Label>MM</Label>
            <Input value={paymentDetails.month} onChangeText={text => onChangeText({ month: text })} maxLength={2} />
          </Item>

          <Item floatingLabel style={{ width: 48 }}>
            <Label>YY</Label>
            <Input value={paymentDetails.year} onChangeText={text => onChangeText({ year: text })} maxLength={2} />
          </Item>
        </View>

        <Item floatingLabel style={{ width: 72 }}>
          <Label>CVC</Label>
          <Input value={paymentDetails.cvc} onChangeText={text => onChangeText({ cvc: text })} maxLength={3} password />
        </Item>
      </StyledInline>
    </View>
  );
};

PaymentDetailsForm.propTypes = {
  paymentDetails: PropTypes.shape({
    ...PaymentPropTypes,
  }).isRequired,
  onChangeText: PropTypes.func.isRequired,
};

export default PaymentDetailsForm;
