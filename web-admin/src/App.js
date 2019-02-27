import React, { Component } from 'react';
import './styles/App.css';
import { BrowserRouter as Router } from "react-router-dom";

import Navbar from './components/Navbar';
import BikeSide from "./screens/BikesSide";
import BikeMap from './screens/BikesMap';

import SmallScreenRoute from './SmallScreenRoute';
import BigScreenRoute from './BigScreenRoute';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="route">
          <Navbar /> {/* Nav bar always displayed */}
          <SmallScreenRoute path="/bikes" Component={BikeSide} reroutePath="/bikes/map" />
          <BigScreenRoute path="/bikes/map" Screen={BikeMap} SidePanel={BikeSide} />
        </div>
      </Router>
    );
  }
}
export default App;
