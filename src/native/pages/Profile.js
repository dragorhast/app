import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Container, Content, List, ListItem, Body, Left, Text, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Header from '../components/Header';
/*
Move componentDidMount fetch data in to this component
 */

class Profile extends React.Component {
  logOut = () => {
    const { logout } = this.props;
    logout()
      .then(Actions.homeLogin())
      .catch(e => console.log(`Error: ${e}`));
  };

  render() {
    const { member } = this.props;
    return (
      <Container>
        <Content>
          <List>
            {member && member.email ? (
              // signed in
              <View>
                <Content padder>
                  <Header
                    title={`Hi ${member.firstName},`}
                    content={`You are currently logged in as ${member.email}`}
                  />
                </Content>

                <ListItem onPress={Actions.updateProfile} icon>
                  <Left>
                    <Icon name="person-add" />
                  </Left>
                  <Body>
                    <Text>Update My Profile</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={() => this.logOut()} icon>
                  <Left>
                    <Icon name="power" />
                  </Left>
                  <Body>
                    <Text>Logout</Text>
                  </Body>
                </ListItem>
              </View>
            ) : (
              // not signed in
              <View>
                <Content padder>
                  <Header title="Hi there," content="Please login to gain extra access" />
                </Content>

                <ListItem onPress={Actions.homeLogin} icon>
                  <Left>
                    <Icon name="power" />
                  </Left>
                  <Body>
                    <Text>Login</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.signUp} icon>
                  <Left>
                    <Icon name="add-circle" />
                  </Left>
                  <Body>
                    <Text>Sign Up</Text>
                  </Body>
                </ListItem>
                <ListItem onPress={Actions.forgotPassword} icon>
                  <Left>
                    <Icon name="help-buoy" />
                  </Left>
                  <Body>
                    <Text>Forgot Password</Text>
                  </Body>
                </ListItem>
              </View>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

Profile.propTypes = {
  member: PropTypes.shape({}),
  logout: PropTypes.func.isRequired,
};

Profile.defaultProps = {
  member: {},
};

export default Profile;
