import React from 'react';
import PropTypes from 'prop-types';
import { Router, Scene, Drawer } from 'react-native-router-flux';
import { Icon } from 'native-base';
import ROUTES from './routes';

// Screens
import Login from './screens/Login';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import SidePanel from './components/SidePanel';
import BikeRentalQR from './screens/RentalStartQR';
import RentalInfo from './screens/RentalInfo';
import IssueReport from './screens/IssueReport';
import PickupPoints from './screens/PickupPoints';

// FOR TESTING VISUAL
import TestScreen from './screens/test-screen';

const VisualInspection = PickupPoints;

// const MyRouter = ({ firebaseId }) => ();

class MyRouter extends React.Component {
  render() {
    const { firebaseId } = this.props;
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key={ROUTES.SignUp} component={SignUp} title="SignUp" hideNavBar initial={!firebaseId} />
          <Scene key={ROUTES.Login} component={Login} title="Login" hideNavBar />
          {/* Any child components that don't have back will show hamburger */}
          <Drawer
            key={ROUTES.Home}
            contentComponent={SidePanel}
            initial={firebaseId}
            drawerIcon={
              <Icon name="ios-menu" ios="ios-menu" android="md-menu" style={{ fontSize: 32, color: 'green' }} />
            }
            drawerWidth={150}
            {...this.props}
          >
            <Scene key={ROUTES.Home} component={Home} title="Tap 2 Go" />
            <Scene key={ROUTES.RentalInfo} component={RentalInfo} back fetchInfoOnLoad />
            <Scene key={ROUTES.RentalStart} component={BikeRentalQR} back />
            <Scene key={ROUTES.RentalInfoNew} component={RentalInfo} fetchInfoOnLoad={false} />
            <Scene key={ROUTES.IssueReport} component={IssueReport} back />
            <Scene key={ROUTES.PickupPoints} component={PickupPoints} back />
          </Drawer>
          {/* <Scene key="test" title="test" component={VisualInspection} /> */}
        </Scene>
      </Router>
    );
  }
}

MyRouter.propTypes = {
  firebaseId: PropTypes.string, // Firebase.auth().currentUser object
};

MyRouter.defaultProps = {
  firebaseId: undefined,
};
export default MyRouter;
