import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from '../styles/constants';

/**
 * class will render the component props on a phone screen
 * but re-route on a larger screen
 */

export default class SmallScreenRoute extends React.PureComponent {
  render() {
    const { path, Component, reroutePath } = this.props;
    return (
      <Route
        exact
        path={path}
        render={routerProps => (
          <Media query={{ maxWidth: PHONE_BREAK_POINT }}>
            {smallScreen => (smallScreen ? <Component {...routerProps} /> : <Redirect from={path} to={reroutePath} />)}
          </Media>
        )}
      />
    );
  }
}

SmallScreenRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,
  reroutePath: PropTypes.string.isRequired,
};
