import React from 'react';
import { Route } from 'react-router-dom';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from './styles/constants'

/**
 * Component will render the side panel component
 * on large screens but not on small ones
 */

export default class BigScreenRoute extends React.PureComponent {
  render(){
    const { path, Screen, SidePanel } = this.props;
    return(
      <Route exact path={path} render={routerProps =>
        <div className="grid-layout">
          <Media query={{ minWidth: PHONE_BREAK_POINT }}>
            {
              bigScreen => bigScreen ?
                <SidePanel {...routerProps} />
                :
                null
            }
          </Media>
          <Screen {...routerProps} />
        </div>
    } />
    );
  }
}
