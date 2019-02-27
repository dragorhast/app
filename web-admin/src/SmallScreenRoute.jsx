import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Media from 'react-media';
import { PHONE_BREAK_POINT } from './styles/constants'


/**
 * Component will render the component on a phone
 * but re-route on a large screen
 */

export default class SmallScreenRoute extends React.PureComponent {
  render(){
    const { path, Component, reroutePath }  = this.props;
    // TODO set width as a constant
    return(
      <Media query={{maxWidth: PHONE_BREAK_POINT }}>
        {
          smallScreen => smallScreen ?
            <Route exact path={path} render={routerProps => <Component {...routerProps} />} />
            :
            <Redirect from={path} to={reroutePath} />
        }
        </Media>
    );
  }
}
