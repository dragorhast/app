import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './shared/redux/store';
import { Firebase } from './shared/constants/firebase';
import './styles/App.css';

// import Navbar from './components/Navbar';
import LoggedInNavBar from './components/LoggedInNavBar';
import BikesSide from './screens/SideScreens/Bikes';
import BikeMap from './screens/BikesMap';
import PickupsSide from './screens/SideScreens/Pickups';
import PickupsMap from './screens/PickupsMap';

import SmallScreenRoute from './templates/SmallScreenRoute';
import BigScreenRoute from './templates/BigScreenRoute';
import MustBeLoggedIn from './screens/MustbeLoggedIn';
import Login from './screens/Login';

class App extends Component {
  state = { firebaseId: undefined };

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   *
   * This is only needed on app start
   *
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = Firebase.auth().onAuthStateChanged(user => {
      this.setState({
        firebaseId: user ? user.uid : null,
      });
    });
  }

  render() {
    const { firebaseId } = this.state;
    return (
      <Provider store={store}>
        <PersistGate loading={<h2>Loading</h2>} persistor={persistor}>
          <Router>
            <div className="route">
              {firebaseId && <Route path="/" component={LoggedInNavBar} />}
              {!firebaseId && <Route exact path="/login" component={Login} />}
              <SmallScreenRoute path="/bikes" Component={BikesSide} reroutePath="/bikes/map" loggedIn={!!firebaseId} />
              <BigScreenRoute path="/bikes/map" Screen={BikeMap} SidePanel={BikesSide} loggedIn={!!firebaseId} />
              <SmallScreenRoute
                path="/pickups"
                Component={PickupsSide}
                reroutePath="/pickups/map"
                loggedIn={!!firebaseId}
              />
              <BigScreenRoute path="/pickups/map" Screen={PickupsMap} SidePanel={PickupsSide} loggedIn={!!firebaseId} />
              <Route exact path="/not-authorized" component={MustBeLoggedIn} />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
