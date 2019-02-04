import React from 'react';
import { connect } from 'react-redux';
import { userSignOut } from '../ducks/user';

export default function withUserFunctions(WrappedComponent) {
  const UserProfileContainer = ({ locale, signOut }) => <WrappedComponent locale={locale} signOut={signOut} />;

  const mapStateToProps = state => ({
    locale: state.locale.country,
  });

  const mapDispatchToProps = {
    signOut: userSignOut,
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfileContainer);
}
