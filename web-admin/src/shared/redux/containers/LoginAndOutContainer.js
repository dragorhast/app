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
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userLogin, userSignOut } from '../ducks/user';

export const LoginAndOutProps = {
  locale: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    error: PropTypes.string,
  }),
};

export default function withLogin(WrappedComponent) {
  const LoginAndOutContainer = ({ locale, login, logout, user, ...restProps }) => (
    <WrappedComponent locale={locale} login={login} logout={logout} user={user} {...restProps} />
  );

  LoginAndOutContainer.propTypes = {
    ...LoginAndOutContainer,
  };

  const mapStateToProps = state => ({
    locale: state.locale.country,
    user: state.user,
  });

  const mapDispatchToProp = {
    login: userLogin,
    logout: userSignOut,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProp
  )(LoginAndOutContainer);
}
