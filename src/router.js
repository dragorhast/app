import React from 'react';
import PropTypes from 'prop-types';
import { Router, Scene } from 'react-native-router-flux';
import ROUTES from './routes';
// Screens
import Login from './screens/Login';
import Home from './screens/Home';
import SignUp from './screens/SignUp';
import SidePanel from './components/SidePanel';
import BikeRentalQR from './screens/RentalStartQR';
import RentalInfo from './screens/RentalInfo';
import IssueReport from './screens/IssueReport';

// FOR TESTING VISUAL
const VisualInspection = IssueReport;

const MyRouter = ({ user }) => (
  <Router>
    <Scene key="root" hideNavBar>
      <Scene key={ROUTES.Login} component={Login} title="Login" hideNavBar initial={!user} />
      <Scene key={ROUTES.SignUp} component={SignUp} title="SignUp" hideNavBar />
      <Scene key={ROUTES.Home} drawer contentComponent={SidePanel} initial={user}>
        <Scene key={ROUTES.Home} component={Home} title="Home" />
        <Scene key={ROUTES.RentalInfo} component={RentalInfo} back fetchInfoOnLoad />
        <Scene key={ROUTES.RentalStart} component={BikeRentalQR} back />
        <Scene key={ROUTES.RentalInfoNew} component={RentalInfo} fetchInfoOnLoad={false} />
        <Scene key={ROUTES.IssueReport} component={IssueReport} back />
      </Scene>
       {/*<Scene key="test" title="test" component={VisualInspection} />*/}
    </Scene>
  </Router>
);

MyRouter.propTypes = {
  user: PropTypes.shape({}), // Firebase.auth().currentUser object
};
export default MyRouter;