import React from 'react';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Label, Input, Text, Button, View, H2, Toast } from 'native-base';
import styled from 'styled-components/native';
import { Screen } from '../styles';
import { translate } from '../../shared/i18n';
import withLogin, { LoginAndOutProps } from '../../shared/redux/containers/LoginAndOutContainer';

import ROUTES from '../routes';

const SPage = styled.View`
  height: 70%;
  width: 90%;
`;
class Login extends React.Component {
  static propTypes = {
    ...LoginAndOutProps,
  };

  static defaultProps = {
    locale: 'en',
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUpdate(newProps) {
    const { error } = this.props;
    if (newProps.error !== error) {
      Toast.show({
        text: newProps.error,
        type: 'danger',
        position: 'top',
        duration: 5000,
        buttonText: 'okay',
      });
    }
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };

  handleSubmit = async () => {
    const { login } = this.props;
    try {
      await login(this.state);
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
          <View padder>
            <H2>{translate('Login', locale)}</H2>
          </View>
          <Form>
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
              <Text>{translate('Login', locale)}</Text>
            </Button>
          </View>

          <View padder>
            <Text onPress={() => Actions[ROUTES.SignUp]()}>{translate('Not got and account? Signup ', locale)}</Text>
          </View>
        </SPage>
      </Screen>
    );
  }
}

export default withLogin(Login);
