import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from './components/Navbar';
import BikeSide from "./screens/BikesSide";
import BikeMap from './screens/BikesMap';

/*
NOTES:

Issue having with current set up is that when BikeMap is > 400 it tried to render BikeSide
but BikeSide tried to redirect when large

What we need is a re-usable way of rendering the below arrangement

* Phone screen
    * /bikes = list of bikes
    * /bikes/map = map view of bikes
    * /bikes/:id = detailed view of bike
* Web screen
    * /bikes = redirect to /bikes/map
    * /bikes/map = list of bikes on the left and map view on right
    * /bikes/:id = list of bikes on the left and detailed view on right

 */

class App extends Component {
  render() {
    return (
      <Router>
        <div className="route">
          <Navbar /> {/* Nav bar always displayed */}
          <Route exact path="/bikes" component={BikeSide} />
          <Route exact path="/bikes/map" component={BikeMap} />
        </div>
      </Router>
    );
  }
}
export default App;
