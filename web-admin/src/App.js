import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { store, persistor } from './shared/redux/store';
import { Firebase } from './shared/constants/firebase';
import './styles/App.css';

// Theming
import Theme from './styles/styledComponentTheme';

// import Navbar from './components/Navbar';
// import LoggedInNavBar from './components/LoggedInNavBar';

import BikesSide from './screens/SideScreens/Bikes';
import BikeMap from './screens/BikesMap';
import BikeSingle from './screens/BikeSingle';

import PickupsSide from './screens/SideScreens/Pickups';
import PickupsMap from './screens/PickupsMap';
import PickupSingle from './screens/PickupSingle';

import ReservationsSide from './screens/SideScreens/Reservations';
import ReservationSingle from './screens/ReservationSingle';
import ReservationsHome from './screens/ReservationsHome';

import IssuesSide from './screens/SideScreens/Issues';
import IssueSingle from './screens/IssueSingle';

import SmallScreenRoute from './templates/SmallScreenRoute';
import BigScreenRoute from './templates/BigScreenRoute';
import MustBeLoggedIn from './screens/MustbeLoggedIn';
import Login from './screens/Login';

class App extends Component {
  state = { firebaseId: undefined, loaded: false };

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
        loaded: true,
      });
    });
  }

  render() {
    const { firebaseId, loaded } = this.state;
    return (
      <Provider store={store}>
        <ThemeProvider theme={Theme}>
          {loaded && (
            <PersistGate loading={<h2>Loading</h2>} persistor={persistor}>
              <Router>
                <div className="route">
                  {/* {firebaseId && <Route path="/" component={LoggedInNavBar} />} */}
                  {!firebaseId && <Route exact path="/login" component={Login} />}
                  <BigScreenRoute path="/bikes/map" Screen={BikeMap} SidePanel={BikesSide} loggedIn={!!firebaseId} />
                  <SmallScreenRoute
                    path="/bikes"
                    Component={BikesSide}
                    reroutePath="/bikes/map"
                    loggedIn={!!firebaseId}
                  />
                  <BigScreenRoute
                    path="/bikes/single/:id"
                    Screen={BikeSingle}
                    SidePanel={BikesSide}
                    loggedIn={!!firebaseId}
                  />
                  <SmallScreenRoute
                    path="/pickups"
                    Component={PickupsSide}
                    reroutePath="/pickups/map"
                    loggedIn={!!firebaseId}
                  />
                  <BigScreenRoute
                    path="/pickups/map"
                    Screen={PickupsMap}
                    SidePanel={PickupsSide}
                    loggedIn={!!firebaseId}
                  />
                  <BigScreenRoute
                    path="/pickups/single/:id"
                    Screen={PickupSingle}
                    SidePanel={PickupsSide}
                    loggedIn={!!firebaseId}
                  />
                  <SmallScreenRoute
                    path="/reservations"
                    Component={ReservationsSide}
                    loggedIn={!!firebaseId}
                    reroutePath="/reservations/home"
                  />
                  <BigScreenRoute
                    path="/reservations/home"
                    Screen={ReservationsHome}
                    SidePanel={ReservationsSide}
                    loggedIn={!!firebaseId}
                  />
                  <BigScreenRoute
                    path="/reservations/single/:id"
                    Screen={ReservationSingle}
                    SidePanel={ReservationsSide}
                    loggedIn={!!firebaseId}
                  />
                  <SmallScreenRoute
                    Component={IssuesSide}
                    loggedIn={!!firebaseId}
                    path="/issues"
                    reroutePath="/issues"
                  />
                  <BigScreenRoute
                    path="/issues/single/:id"
                    Screen={IssueSingle}
                    SidePanel={IssuesSide}
                    loggedIn={!!firebaseId}
                  />
                  <Route exact path="/not-authorized" component={MustBeLoggedIn} />
                </div>
              </Router>
            </PersistGate>
          )}
        </ThemeProvider>
      </Provider>
    );
  }
}
export default App;
