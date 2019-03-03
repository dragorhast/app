import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from '../styles/constants';

/**
 * Component for rendering screens that are visible on big OR small
 * screens
 *
 * Will render the side panel component
 * on large screens but not on small ones
 */

const BigScreenRoute = ({ path, Screen, SidePanel }) => (
  <Route
    exact
    path={path}
    render={routerProps => (
      <Media query={{ minWidth: PHONE_BREAK_POINT }}>
        {bigScreen => (
          <div className="grid-layout">
            {bigScreen && <SidePanel {...routerProps} />}
            <Screen {...routerProps} smallScreen={!bigScreen} />
          </div>
        )}
      </Media>
    )}
  />
);

BigScreenRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Screen: PropTypes.func.isRequired,
  SidePanel: PropTypes.func.isRequired,
};

export default BigScreenRoute;
