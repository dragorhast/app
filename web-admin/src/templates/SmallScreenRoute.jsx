import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Media from 'react-media';
import MustBeLoggedIn from '../screens/MustbeLoggedIn';
import { PHONE_BREAK_POINT } from '../styles/constants';

/**
 * class will render the component props on a phone screen
 * but re-route on a larger screen
 */
const SmallScreenRoute = ({ path, Component, reroutePath, loggedIn }) => (
  <Route
    exact
    path={path}
    render={routerProps =>
      loggedIn ? (
        <Media query={{ maxWidth: PHONE_BREAK_POINT }}>
          {smallScreen =>
            smallScreen ? <Component {...routerProps} smallScreen /> : <Redirect from={path} to={reroutePath} />
          }
        </Media>
      ) : (
        <MustBeLoggedIn />
      )
    }
  />
);

SmallScreenRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
  reroutePath: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default SmallScreenRoute;
