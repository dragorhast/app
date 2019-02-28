import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './shared/redux/store';
import './styles/App.css';

import Navbar from './components/Navbar';
import BikesSide from './screens/SideScreens/Bikes';
import BikeMap from './screens/BikesMap';
import PickupsSide from './screens/SideScreens/Pickups';
import PickupsMap from './screens/PickupsMap';

import SmallScreenRoute from './templates/SmallScreenRoute';
import BigScreenRoute from './templates/BigScreenRoute';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<h2>Loading</h2>} persistor={persistor}>
          <Router>
            <div className="route">
              <Navbar /> {/* Nav bar always displayed */}
              <SmallScreenRoute path="/bikes" Component={BikesSide} reroutePath="/bikes/map" />
              <BigScreenRoute path="/bikes/map" Screen={BikeMap} SidePanel={BikesSide} />
              <SmallScreenRoute path="/pickups" Component={PickupsSide} reroutePath="/pickups/map" />
              <BigScreenRoute path="/pickups/map" Screen={PickupsMap} SidePanel={PickupsSide} />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
