import React from 'react';
import PropTypes from 'prop-types';
import { H3, Thumbnail, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spacer from './Spacer';
import { Screen, BreakLine } from '../styles';
import ROUTES from '../routes';
import withLogoutFunctions, { LoginAndOutProps } from '../../shared/redux/containers/LoginAndOutContainer';

const onRouteSelected = (routeName, navigation) => {
  navigation.closeDrawer();
  Actions[routeName]();
};

const SidePanel = ({ logout, navigation }) => (
  <Screen>
    <View style={{ height: '80%', width: '100%', alignItems: 'center' }}>
      <View>
        <Thumbnail source={require('./graphic.png')} large square />
      </View>

      <Spacer size={48} />

      <BreakLine width="80%" />

      <Spacer size={16} />

      <View style={{ height: 160, justifyContent: 'space-evenly' }}>
        <H3 onPress={() => onRouteSelected(ROUTES.Home, navigation)}>Home</H3>
        <H3>Profile</H3>
        <H3 onPress={() => onRouteSelected(ROUTES.IssueReport, navigation)}>Issue</H3>
        <H3>About</H3>
        <BreakLine width="100%" />
        <H3 onPress={() => logout()}>Logout</H3>
      </View>
    </View>
  </Screen>
);

SidePanel.propTypes = {
  ...LoginAndOutProps,
  navigation: PropTypes.object.isRequired,
};

export default withLogoutFunctions(SidePanel);
