import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../redux/actions/member';

const Home = ({ Layout, memberLogout }) => <Layout logout={memberLogout} />;

Home.propTypes = {
  Layout: PropTypes.func.isRequired,
  memberLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  memberLogout: logout,
  // something related to unlocking bike
};

// First argument must be mapStateToProps
// So passed null since none of state is needed
export default connect(
  null,
  mapDispatchToProps
)(Home);
