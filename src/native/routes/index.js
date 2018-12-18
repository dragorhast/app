import React from 'react';
import { Scene, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../pages/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../pages/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../pages/ForgotPassword';

import LocaleContainer from '../../containers/Locale';
import LocaleComponent from '../pages/Locale';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../pages/UpdateProfile';

import MemberContainer from '../../containers/Member';
import ProfileComponent from '../pages/Profile';

// import AboutComponent from '../components/About';

import HomePage from '../pages/Home';
import UnlockBikePage from '../pages/UnlockBikePage';
import BikeRentalContainer from '../../containers/BikeRentalContainer';

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
      <Scene key="unlockBike" component={BikeRentalContainer} Layout={UnlockBikePage} />
    </Stack>
    {/* Profile Stack */}
    <Stack
      key="profile"
      title="PROFILE"
      icon={() => <Icon name="contact" {...DefaultProps.icons} />}
      {...DefaultProps.navbarProps}
    >
      {/* Profile Home render first when bottom bar profile button is clicked */}
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
        key="locale"
        title="CHANGE LANGUAGE"
        {...DefaultProps.navbarProps}
        component={LocaleContainer}
        Layout={LocaleComponent}
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
    {/* Login and logout */}
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
