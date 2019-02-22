import React from 'react';
import Media from 'react-media';
import BikeSide from './BikesSide';

class BikeMap extends React.PureComponent {
  render(){
    return(
      <div className="grid">
        <Media query={{minWidth: 399}}>
          {matches =>
            matches ? <h2>Big screen</h2> : <h2>Small Screen</h2>
          }
        </Media>

        <div>
          <h2>Map</h2>
        </div>
      </div>
    );
  }
}


export default BikeMap;
