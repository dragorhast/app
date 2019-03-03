import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import withSignOut from '../shared/redux/containers/LoginAndOutContainer';

const STabBar = styled.div`
  position: sticky;
  top: 0; /* Distance from top to stick to*/
  background-color: white; // TODO change to primary
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 64px;
  border-bottom: 1px solid grey;
  a {
    text-decoration: none;
    color: grey;
    flex: 1;
    height: 100%;
  }
`;

const SNavSelection = styled.div`
  flex: 1;
  border-right: 1px solid grey;
  padding: 16px 8px;
  text-align: center;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props => props.selected && 'color: green;'}
`;

class LoggedInNavBar extends React.PureComponent {
  initiateLogOut = async () => {
    const { logout, history } = this.props;
    try {
      await logout();
      history.replace('/login');
    } catch (e) {
      // Do nothing if error
      console.log(e);
      return Promise.resolve();
    }
  };

  render() {
    const { location } = this.props;
    return (
      <STabBar>
        <SNavSelection>Tap 2 Go</SNavSelection>
        <Link to="/bikes">
          <SNavSelection selected={location.pathname.match(/\/bikes/g)}>Bike</SNavSelection>
        </Link>
        <Link to="/pickups">
          <SNavSelection selected={location.pathname.match(/\/pickup/g)}>Pickup Points</SNavSelection>
        </Link>
        <Link to="/issues">
          <SNavSelection selected={location.pathname.match(/\/issue/g)}>Issues</SNavSelection>
        </Link>
        <Link to="/reservations">
          <SNavSelection selected={location.pathname.match(/\/reservations/g)}>Reservations</SNavSelection>
        </Link>
        <Link to="/reports">
          <SNavSelection selected={location.pathname.match(/\/reports/g)}>Reports</SNavSelection>
        </Link>
        <div style={{ flex: 1 }} />

        <SNavSelection onClick={this.initiateLogOut}>Sign Out</SNavSelection>
      </STabBar>
    );
  }
}

LoggedInNavBar.propTypes = {
  /* Passed in from <Route> */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withSignOut(LoggedInNavBar);
