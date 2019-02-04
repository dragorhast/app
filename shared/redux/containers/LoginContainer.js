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
import { userLogin } from '../ducks/user';

export default function withLogin(WrappedComponent) {
  const LoginContainer = ({ locale, status, login }) => (
    <WrappedComponent locale={locale} loading={status.loading} error={status.error} onFormSubmit={login} />
  );

  const mapStateToProps = state => ({
    locale: state.locale.country,
    status: state.status,
  });

  const mapDispatchToProp = {
    login: formData => userLogin(formData),
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(LoginContainer);
}
