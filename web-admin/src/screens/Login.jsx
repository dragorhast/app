import React from 'react';
import styled from 'styled-components';
import { Logo, SButton } from '../styles/components/Common';
import withLogin, { LoginAndOutProps } from '../shared/redux/containers/LoginAndOutContainer';
import { LogoGraphic } from '../components/LogoGraphic';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: inherit;
`;

const LoginBlock = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 6em;
  ${props => `color: ${props.theme.font};`}
`;

const LoginInput = styled.input`
  font-size: 1.2em;
  font-weight: 500;
  padding: 0.3em 0.5em;
  color: inherit;
  margin-bottom: 0.8em;
  ${props => `border: 1px solid ${props.theme.outlineColor};`}
`;

const LoginInputLabel = styled.label`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 0.1em;
`;

const Errors = styled.h4`
  color: red; // TODO change to theme danger
  position: absolute;
  margin: 0;
  top: 105%;
`;

class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
  };

  componentDidMount() {
    document.addEventListener('keydown', this.enterHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.enterHandler);
  }

  initiateLogin = async () => {
    const { login, history } = this.props;
    const { email, password } = this.state;
    try {
      await login({ email, password, adminCheck: true });
      history.push('bikes');
    } catch (e) {
      console.log(e.message);
      return Promise.resolve();
    }
  };

  handleTextInput = (field, value) => {
    this.setState({ [field]: value });
  };

  enterHandler = event => {
    if (event.key === 'Enter') this.initiateLogin();
  };

  render() {
    const { email, password } = this.state;
    const { user } = this.props;
    return (
      <LoginContainer>
        <LogoGraphic />
        <LoginBlock>
          <h1 style={{ fontSize: '3em', margin: 0 }}>
            <Logo />
            &nbsp;Admin
          </h1>
          <p>
            Welcome to the <Logo /> admin interface. If you are a user, please&nbsp;
            <a href="https://www.tap2go.co.uk">download the app</a>. Otherwise, please login below.
          </p>
          <LoginInputLabel>Email</LoginInputLabel>
          <LoginInput value={email} onChange={e => this.handleTextInput('email', e.target.value)} />
          <LoginInputLabel>Password</LoginInputLabel>
          <LoginInput
            value={password}
            onChange={e => this.handleTextInput('password', e.target.value)}
            type="password"
          />
          <SButton onClick={this.initiateLogin}>Log In</SButton>
          {errors ? <Errors>{errors}</Errors> : null}
        </LoginBlock>
      </LoginContainer>
    );
  }
}

Login.propTypes = {
  ...LoginAndOutProps,
};

export default withLogin(Login);
