/**
 * Container that handles interaction with redux for the signed in user;s profile
 *
 * When ever rendered member data is reloaded through fetchData()
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout, getMemberData } from '../redux/actions/member';

class Member extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    memberLogout: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    member: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
    }).isRequired,
  };

  componentDidMount = () => {
    const { fetchData } = this.props;
    // fetchData(); // might be useful later but causing issues with app 17/1/19
  };

  render = () => {
    const { Layout, member, memberLogout } = this.props;

    return <Layout member={member} logout={memberLogout} />;
  };
}

const mapStateToProps = state => ({
  member: state.member || {},
});

const mapDispatchToProps = {
  memberLogout: logout,
  fetchData: getMemberData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Member);
