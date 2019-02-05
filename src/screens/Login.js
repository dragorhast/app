import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { Form, Item, Label, Input, Text, Button, View, H2 } from 'native-base';
import styled from 'styled-components/native';
import { Screen } from '../styles';
import { translate } from '../../shared/i18n';
import withLogin from '../../shared/redux/containers/LoginContainer';

import ROUTES from '../routes';

import Loading from './LoadingScreen';
import Messages from '../components/Messages';

const SPage = styled.View`
  height: 70%;
  width: 90%;
`;
class Login extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    onFormSubmit: PropTypes.func.isRequired,
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

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };

  handleSubmit = async () => {
    const { onFormSubmit } = this.props;
    try {
      await onFormSubmit(this.state);
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
