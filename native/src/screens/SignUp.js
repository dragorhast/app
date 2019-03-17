import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Label, Input, Text, Button, View, H2 } from 'native-base';
import styled from 'styled-components/native';
import { translate } from '../../shared/i18n';
import { Screen } from '../styles';

import withSignUp, { SignUpProps } from '../../shared/redux/containers/SignUpContainer';

import ROUTES from '../routes';

const SPage = styled.View`
  height: 70%;
  width: 90%;
`;

class SignUp extends React.Component {
  static propTypes = {
    ...SignUpProps,
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };

  handleSubmit = async () => {
    const { signUp } = this.props;
    try {
      await signUp(this.state);
      Actions[ROUTES.Home]();
    } catch (e) {
      return Promise.resolve();
    }
  };

  render() {
    const { locale } = this.props;

    return (
      <Screen>
        <SPage>
          <H2>{translate('Welcome', locale)}</H2>

          <Form>
            <Item stackedLabel>
              <Label>{translate('First Name', locale)}</Label>
              <Input onChangeText={v => this.handleChange('firstName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>{translate('Last Name', locale)}</Label>
              <Input onChangeText={v => this.handleChange('lastName', v)} />
            </Item>

            <Item stackedLabel>
              <Label>{translate('Email', locale)}</Label>
              <Input
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>

            <Item stackedLabel>
              <Label>{translate('Password', locale)}</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>
          </Form>

          <View padder>
            <Button halfWid onPress={this.handleSubmit}>
              <Text>{translate('Sign Up', locale)}</Text>
            </Button>
          </View>

          <View padder>
            <Text onPress={() => Actions[ROUTES.Login]()}>{translate('Already got an account? Login ', locale)}</Text>
          </View>
        </SPage>
      </Screen>
    );
  }
}

export default withSignUp(SignUp);
