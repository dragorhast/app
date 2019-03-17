import React from 'react';
import PropTypes from 'prop-types';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import { Icon } from 'native-base';
import ROUTES from './routes';
import THEME from './styles/styledComponentTheme';

// Screens
import Login from './screens/Login';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import SidePanel from './components/SidePanel';
import RentalStartQR from './screens/RentalStartQR';
import RentalInfo from './screens/RentalInfo';
import IssueReport from './screens/IssueReport';
import PickupPoints from './screens/PickupPoints';
import ReservationCreate from './screens/ReservationCreate';
import ReservationDisplay from './screens/ReservationDisplay';
import ReservationsUpcoming from './screens/ReservationsUpcoming';
import ProfileScreen from './screens/ProfileScreen';
import PaymentRequired from './screens/PaymentRequired';
import ClosestBike from './screens/ClosestBike';

// FOR TESTING VISUAL
import TestScreen from './screens/test-screen';
import IntroSlideShow from './screens/IntroSlideshow';
import MapBikeAndPickups from './screens/MapBikeAndPickups';

const VisualInspection = TestScreen;

class MyRouter extends React.PureComponent {
  render() {
    const { firebaseId, firstTimeOnApp } = this.props;
    return (
      <Router>
        <Scene key="root" navBarButtonColor={THEME.primary}>
          {firstTimeOnApp ? (
            <Scene key={ROUTES.IntroSlideShow} component={IntroSlideShow} hideNavBar initial />
          ) : (
            <Scene key={ROUTES.SignUp} component={SignUp} title="SignUp" hideNavBar initial={!firebaseId} />
          )}

          <Scene key={ROUTES.Login} component={Login} title="Login" hideNavBar initial={!firstTimeOnApp} />

          {/* Any child components that don't have back will show hamburger */}
          <Drawer
            key={ROUTES.Home}
            contentComponent={SidePanel}
            initial={firebaseId}
            drawerIcon={
              <Icon name="ios-menu" ios="ios-menu" android="md-menu" style={{ fontSize: 32, color: 'green' }} />
            }
            drawerWidth={150}
            hideNavBar
            {...this.props}
          >
            <Scene key={ROUTES.Home} component={Home} title="Unlock Bike" />
            <Scene key={ROUTES.RentalInfo} component={RentalInfo} fetchInfoOnLoad back title="Current Rental" />
            <Scene key={ROUTES.RentalInfoNew} component={RentalInfo} fetchInfoOnLoad={false} />
            <Scene key={ROUTES.IssueReport} component={IssueReport} back />
            <Scene key={ROUTES.ReservationDisplayWithBurger} component={ReservationDisplay} title="Reservation" />
            <Scene key={ROUTES.ReservationDisplayWithBack} component={ReservationDisplay} title="Reservation" back />
            <Scene
              key={ROUTES.ReservationsUpcoming}
              component={ReservationsUpcoming}
              title="Upcoming Reservations"
              back
            />
            <Scene key={ROUTES.Profile} component={ProfileScreen} title="Profile" back />
            {/* <Scene key="test" title="test" component={VisualInspection} /> */}
          </Drawer>
          <Scene key={ROUTES.RentalStart} component={RentalStartQR} back />
          <Scene key={ROUTES.PickupPoints} component={PickupPoints} title="Pickup Points" back />
          <Scene key={ROUTES.ReservationCreation} component={ReservationCreate} title="Confirm Rental" back />
          <Scene key={ROUTES.ClosestBike} component={ClosestBike} title="Closest Bike" back />
          <Scene key={ROUTES.PaymentRequired} component={PaymentRequired} title="Payment Required" back />
          <Scene key={ROUTES.MapWithBikes} component={MapBikeAndPickups} title="Bikes + Pickups" back />
        </Scene>
      </Router>
    );

    // ****** FOR TESTING A SCREEN ****** //

    // return (
    //   <Router>
    //     <Scene key="root" hideNavBar>
    //       <Drawer
    //         key={ROUTES.Home}
    //         contentComponent={SidePanel}
    //         drawerIcon={
    //           <Icon name="ios-menu" ios="ios-menu" android="md-menu" style={{ fontSize: 32, color: 'green' }} />
    //         }
    //         drawerWidth={150}
    //         {...this.props}
    //       >
    //         <Scene key="test" title="test" component={VisualInspection} />
    //       </Drawer>
    //     </Scene>
    //   </Router>
    // );
  }
}

MyRouter.propTypes = {
  firebaseId: PropTypes.string, // Firebase.auth().currentUser object
  firstTimeOnApp: PropTypes.bool.isRequired,
};

MyRouter.defaultProps = {
  firebaseId: undefined,
};
export default MyRouter;
