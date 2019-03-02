import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const STabBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid grey;
  a {
    text-decoration: none;
    color: grey;
    flex: 1;
  }
`;

const SNavSelection = styled.div`
  flex: 1;
  border-right: 1px solid grey;
  padding: 16px 8px;
  text-align: center;

  ${props => props.selected && 'border-bottom: 2px solid green; color: green;'}
`;

const TabBar = ({ location }) => (
  <STabBar style={location}>
    <Link to="/bikes">
      <SNavSelection selected={location.pathname.match(/\/bikes/g)}>Bike</SNavSelection>
    </Link>
    <Link to="/pickups">
      <SNavSelection selected={location.pathname.match(/\/pickup/g)}>Pickup Points</SNavSelection>
    </Link>
    <Link to="/issues">
      <SNavSelection selected={location.pathname.match(/\/issue/g)}>Issues</SNavSelection>
    </Link>
    <div style={{ flex: 3 }} />
  </STabBar>
);

TabBar.propTypes = {
  /* Passed in from <Route> */
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default TabBar;
