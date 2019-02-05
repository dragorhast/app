import React from 'react';
import PropTypes from 'prop-types';
import { H3, Thumbnail, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Spacer from './Spacer';
import { Screen, BreakLine } from '../styles';
import ROUTES from '../routes';
import withUserFunctions from '../../shared/redux/containers/UserProfileContainer';

class SidePanel extends React.Component {
  onRouteSelected(routeName) {
    this.props.navigation.closeDrawer();
    console.log(routeName);
    Actions[routeName]();
  }

  render() {
    const { signOut, navigato } = this.props;

    return (
      <Screen>
        <View style={{ height: '80%', width: '100%', alignItems: 'center' }}>
          <Thumbnail source={require('./graphic.png')} large square onPress={() => this.onRouteSelected(ROUTES.Home)} />

          <Spacer size={48} />

          <BreakLine width="80%" />

          <Spacer size={16} />

          <View style={{ height: 160, justifyContent: 'space-evenly' }}>
            <H3 onPress={signOut}>Logout</H3>
            <H3>Profile</H3>
            <H3 onPress={() => this.onRouteSelected(ROUTES.IssueReport)}>Issue</H3>
            <H3>About</H3>
          </View>
        </View>
      </Screen>
    );
  }
}
// const SidePanel = ({ signOut }) => (
//
// );

SidePanel.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default withUserFunctions(SidePanel);
