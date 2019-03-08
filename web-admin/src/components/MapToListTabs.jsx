import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const StyledTabBar = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledTab = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${props =>
    props.activeTab
      ? `
  color: ${props.theme.primary}
  border-bottom: 2px solid ${props.theme.primary}
  `
      : ``}
`;

const MapToListTabs = ({ mapView, listView, linkToMap, linkToList, history }) => (
  <StyledTabBar>
    <StyledTab
      activeTab={listView}
      onClick={() => {
        return linkToList && history.push(linkToList);
      }}
    >
      <h2>List</h2>
    </StyledTab>
    <StyledTab
      activeTab={mapView}
      onClick={() => {
        return linkToMap && history.push(linkToMap);
      }}
    >
      <h2>Map</h2>
    </StyledTab>
  </StyledTabBar>
);

MapToListTabs.propTypes = {
  mapView: PropTypes.bool,
  linkToList: PropTypes.string,
  listView: PropTypes.bool,
  linkToMap: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

MapToListTabs.defaultProps = {
  mapView: false,
  linkToList: null,
  listView: false,
  linkToMap: null,
};

export default withRouter(MapToListTabs);
