import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from '../styles/constants';

/**
 * class will render the component props on a phone screen
 * but re-route on a larger screen
 */
const SmallScreenRoute = ({ path, Component, reroutePath }) => (
  <Route
    exact
    path={path}
    render={routerProps => (
      <Media query={{ maxWidth: PHONE_BREAK_POINT }}>
        {smallScreen =>
          smallScreen ? <Component {...routerProps} smallScreen /> : <Redirect from={path} to={reroutePath} />
        }
      </Media>
    )}
  />
);

SmallScreenRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
  reroutePath: PropTypes.string.isRequired,
};

export default SmallScreenRoute;
