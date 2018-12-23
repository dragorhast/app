import React from 'react';
import { Scene, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

// Props for making nav bar look pretty
import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../pages/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../pages/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../pages/ForgotPassword';

// import LocaleContainer from '../../containers/Locale';
// import LocaleComponent from '../pages/Locale';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../pages/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../pages/Profile';

// import AboutComponent from '../components/About';

// No interaction with redux required
import HomePage from '../pages/Home';

import BikeRentalStartContainer from '../../containers/BikeRentalStartContainer';
import BikeRentalStartPage from '../pages/BikeRentalStartPage';

import BikeRentalInfoContainer from '../../containers/BikeRentalInfoContainer';
import BikeRentalCurrentPage from '../pages/BikeRentalCurrentPage';

const Index = (
  <Stack hideNavBar>
    {/* Home Stack */}
    <Stack
      key="home"
      title={AppConfig.appName.toUpperCase()}
      icon={() => <Icon name="planet" {...DefaultProps.icons} />}
      {...DefaultProps.navbarProps}
    >
      <Scene key="home" component={HomePage} />
      <Scene key="bikeRentalStart" component={BikeRentalStartContainer} Layout={BikeRentalStartPage} />
      <Scene key="bikeRentalInfo" component={BikeRentalInfoContainer} Layout={BikeRentalCurrentPage} />
    </Stack>
    {/* Current Rental Stack */}
    {/* <Stack key="currentRental" title={AppConfig.appName.toUpperCase()} {...DefaultProps.navbarProps}> */}
    {/* <Scene key="bikeRentalInfo" component={BikeRentalInfoContainer} Layout={BikeRentalCurrentPage} /> */}
    {/* </Stack> */}
    {/* All actions related to the user */}
    <Stack
      key="profile"
      title="PROFILE"
      icon={() => <Icon name="contact" {...DefaultProps.icons} />}
      {...DefaultProps.navbarProps}
    >
      <Scene key="profileHome" component={MemberContainer} Layout={ProfileComponent} back />
      {/* These are all pages that can clicked to from inside this stack */}
      <Scene
        back
        key="forgotPassword"
        title="FORGOT PASSWORD"
        {...DefaultProps.navbarProps}
        component={ForgotPasswordContainer}
        Layout={ForgotPasswordComponent}
      />
      <Scene
        back
        key="updateProfile"
        title="UPDATE PROFILE"
        {...DefaultProps.navbarProps}
        component={UpdateProfileContainer}
        Layout={UpdateProfileComponent}
      />
    </Stack>
    {/* Login and logout scenes */}
    <Scene
      hideNavBar
      key="homeLogin"
      title="LOGIN"
      {...DefaultProps.navbarProps}
      component={LoginContainer}
      Layout={LoginComponent}
    />
    <Scene
      back
      key="signUp"
      title="SIGN UP"
      {...DefaultProps.navbarProps}
      component={SignUpContainer}
      Layout={SignUpComponent}
    />
  </Stack>
);

export default Index;
