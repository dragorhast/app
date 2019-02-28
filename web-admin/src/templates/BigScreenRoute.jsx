import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from '../styles/constants';

/**
 * Component will render the side panel component
 * on large screens but not on small ones
 */

export default class BigScreenRoute extends React.PureComponent {
  render() {
    const { path, Screen, SidePanel } = this.props;
    return (
      <Route
        exact
        path={path}
        render={routerProps => (
          <div className="grid-layout">
            <Media query={{ minWidth: PHONE_BREAK_POINT }} render={() => <SidePanel {...routerProps} />} />
            <Screen {...routerProps} />
          </div>
        )}
      />
    );
  }
}

BigScreenRoute.propTypes = {
  path: PropTypes.string.isRequired,
  Screen: PropTypes.func.isRequired,
  SidePanel: PropTypes.func.isRequired,
};