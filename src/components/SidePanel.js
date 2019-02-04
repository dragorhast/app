import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import { Screen } from '../styles';
import withUserFunctions from '../../shared/redux/containers/UserProfileContainer';

const SidePanel = ({ signOut }) => (
  <Screen>
    <Text onPress={signOut}>Logout</Text>
  </Screen>
);

SidePanel.propTypes = {
  signOut: PropTypes.func.isRequired,
};

export default withUserFunctions(SidePanel);
