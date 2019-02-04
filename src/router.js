import React from 'react';
// import { connect } from 'react-redux';
import { Router, Scene } from 'react-native-router-flux';
import ROUTES from './routes';
// Screens
import Login from './screens/Login';
import Home from './screens/Home';
import SignUp from './screens/SignUp';

const MyRouter = () => (
  <Router>
    <Scene key="root" hideNavBar>
      <Scene key={ROUTES.Login} component={Login} title="Login" hideNavBar />
      <Scene key={ROUTES.SignUp} component={SignUp} title="SignUp" hideNavBar />
      <Scene key="drawer" drawer contentComponent={Home}>
        <Scene key={ROUTES.Home} component={Home} title="Home" />
      </Scene>
      <Scene key="home" component={Home} title="Home" />
    </Scene>
  </Router>
);

// const mapStateToProps = state => ({
//   user: state.user || {},
// });

// export default connect(mapStateToProps)(MyRouter);
export default MyRouter;
