/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { paymentSetDetails, editSectionPayments, PaymentPropTypes } from '../ducks/payment';
import { deleteUser, UserPropTypes } from '../ducks/user';

export const ProfileProps = {
  locale: PropTypes.string.isRequired,
  paymentDetails: PropTypes.shape({
    ...PaymentPropTypes,
  }),
  setPaymentDetails: PropTypes.func.isRequired,
  editSectionPayments: PropTypes.func.isRequired,
  user: PropTypes.shape({ ...UserPropTypes }),
  userDelete: PropTypes.func.isRequired,
};

export default function withProfile(WrappedComponent) {
  // Pure function always auto re-loads children on prop change!
  class ProfileContainer extends React.PureComponent {
    render() {
      const {
        locale,
        paymentDetails,
        setPaymentDetails,
        editSectionPayments,
        user,
        userDelete,
        ...restProps
      } = this.props;
      return (
        <WrappedComponent
          locale={locale}
          paymentDetails={paymentDetails}
          setPaymentDetails={setPaymentDetails}
          editSectionPayments={editSectionPayments}
          user={user}
          userDelete={userDelete}
          {...restProps} // passes any others through
        />
      );
    }
  }

  ProfileContainer.propTypes = {
    ...ProfileProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    paymentDetails: state.payment,
    user: state.user,
  });

  const mapDispatchToProp = {
    setPaymentDetails: paymentSetDetails,
    editSectionPayments,
    userDelete: deleteUser,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(ProfileContainer);
}
