/**
 * HOC to wrap any component/screen/page that
 * needs to login
 *
 * Must pass as props:
 * - locale
 * - errors
 * - loading
 * - Login function
 */
import React from 'react';
import { connect } from 'react-redux';
import { userLogin, userSignOut } from '../ducks/user';

export default function withLogin(WrappedComponent) {
  const LoginContainer = ({ locale, login, userSignOut }) => (
    <WrappedComponent locale={locale} onFormSubmit={login} test={userSignOut} />
  );

  const mapStateToProps = state => ({
    locale: state.locale.country,
  });

  const mapDispatchToProp = {
    login: userLogin,
    userSignOut,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(LoginContainer);
}
