import React from 'react';
import Media from 'react-media';
import { Redirect } from 'react-router-dom';

// TODO change from in redirect to take from props
class BikeSide extends React.PureComponent {
  render(){
    return(
      <Media query={{minWidth: 399}}>
        {matches =>
          matches ? <Redirect from="/bikes" to="/bikes/map" /> :
            <div>
              <h2>Bikes List</h2>
            </div>
        }
      </Media>
    );
  }
}


export default BikeSide;
