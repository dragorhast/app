import React from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Item, Label, Input, Text, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Messages from '../components/Messages';
import { translate } from '../../i18n/index';
import Header from '../components/Header';
import Spacer from '../components/Spacer';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    locale: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  };

  static defaultProps = {
    error: null,
    success: null,
    locale: null,
    member: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: props.member && props.member.email ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const { member } = this.props;
    if (member.uid) Actions.home();
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  };

  // TODO add toast error handling for bad login attempt
  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(Actions.home())
      .catch(e => console.log(`Error: ${e}`));
  };

  render() {
    const { loading, error, success, locale, member } = this.props;
    const { email } = this.state;

    if (loading) return <Loading />;

    return (
      <Container>
        <Content>
          <View padder>
            <Header title="Login" content="Please use your email and password to login." />
            {success ? <Messages type="success" message={success} /> : null}
            {error ? <Messages message={error} /> : null}
          </View>

          <Form>
            <Item stackedLabel>
              <Label>{translate('Email', locale)}</Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>{translate('Password', locale)}</Label>
              <Input secureTextEntry onChangeText={v => this.handleChange('password', v)} />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Button block onPress={this.handleSubmit}>
                <Text>{translate('Login', locale)}</Text>
              </Button>
            </View>
          </Form>
          <View padder>
            <Text onPress={() => Actions.signUp()}>{translate('Not go and account? Signup ', locale)}</Text>
          </View>
        </Content>
      </Container>
    );
  }
}

export default Login;
