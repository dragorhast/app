/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { paymentSetDetails, editSectionPayments, PaymentPropTypes } from '../ducks/payment';

export const PaymentProps = {
  locale: PropTypes.string.isRequired,
  paymentDetails: PropTypes.shape({
    ...PaymentPropTypes,
  }),
  setPaymentDetails: PropTypes.func.isRequired,
  editSectionPayments: PropTypes.func.isRequired,
};

export default function withPaymentDetails(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class PaymentDetailsContainer extends React.PureComponent {
    render() {
      const { locale, paymentDetails, setPaymentDetails, editSectionPayments, ...restProps } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          editSectionPayments={editSectionPayments}
          {...restProps} // passes any others through
        />
      );
    }
  }

  PaymentDetailsContainer.propTypes = {
    ...PaymentProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    paymentDetails: state.payment,
  });

  const mapDispatchToProp = {
    setPaymentDetails: paymentSetDetails,
    editSectionPayments,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(PaymentDetailsContainer);
}
