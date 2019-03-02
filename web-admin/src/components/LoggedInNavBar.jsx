import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const LoggedInNavBar = ({ location }) => (
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

    <SNavSelection>Login</SNavSelection>
  </STabBar>
);

LoggedInNavBar.propTypes = {
  /* Passed in from <Route> */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default LoggedInNavBar;
