/**
 * Higher Order Component that will pass props to any component/screen/page
 * that exports with this functions
 *
 * Must pass as props:
 * - locale
 * - loading
 * - errors with what has been typed in
 * - function to sign up the user
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { userSignUp } from '../ducks/user';

export const SignUpProps = {
  locale: PropTypes.string.isRequired,
  signUp: PropTypes.func.isRequired,
};

export default function withSignUp(WrappedComponent) {
  // Creates the wrapped component with no life cycle methods
  const SignUpContainer = ({ locale, signUp, ...restProps }) => (
    <WrappedComponent locale={locale} signUp={signUp} {...restProps} />
  );

  SignUpContainer.propTypes = {
    ...SignUpProps,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
  });

  const mapDispatchToProp = {
    signUp: userSignUp,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(SignUpContainer);
}
