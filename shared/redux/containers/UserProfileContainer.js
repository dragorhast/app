import React from 'react';
import { connect } from 'react-redux';
import { userSignOut } from '../ducks/user';

export default function withUserFunctions(WrappedComponent) {
  const UserProfileContainer = props => <WrappedComponent locale={props.locale} signOut={props.signOut} {...props} />;

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
