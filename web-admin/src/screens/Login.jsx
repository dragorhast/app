import React from 'react';
import styled from 'styled-components';
import { SButton, SCenteredScreen } from '../styles/commonStyles';
import withLogin, { LoginAndOutProps } from '../shared/redux/containers/LoginAndOutContainer';

const SFormBlock = styled.div`
  width: 240px;
  display: flex;
  flex-direction: column;
  margin: 8px;
`;

const SFormInput = styled.input`
  width: 100%;
  height: 48px;
  font-size: 20px;
  border-radius: 8px;
  border: 2px solid lavender;
  padding: 0 8px;
`;

const SFormLabel = styled.label`
  font-size: 14px;
  margin: 8px 0;
`;

const SErrorText = styled.h3`
  color: red; // TODO change to theme danger
`;

class Login extends React.PureComponent {
  state = {
    email: '',
    password: '',
    errors: null,
  };

  handleTextInput = (field, value) => {
    this.setState({ [field]: value });
  };

  initiateLogin = async () => {
    const { login, history } = this.props;
    const { email, password } = this.state;
    try {
      await login({ email, password });
      history.push('bikes');
    } catch (e) {
      console.log(e);
      this.setState({ errors: e.message });
    }
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <SCenteredScreen>
        {errors && <SErrorText>errors</SErrorText>}
        <SFormBlock>
          <SFormLabel>Email</SFormLabel>
          <SFormInput value={email} onChange={e => this.handleTextInput('email', e.target.value)} />
        </SFormBlock>
        <SFormBlock>
          <SFormLabel>Password</SFormLabel>
          <SFormInput
            value={password}
            onChange={e => this.handleTextInput('password', e.target.value)}
            type="password"
          />
        </SFormBlock>
        <div style={{ margin: '8px' }}>
          <SButton onClick={this.initiateLogin}>Log In</SButton>
        </div>
      </SCenteredScreen>
    );
  }
}

Login.propTypes = {
  ...LoginAndOutProps,
};

export default withLogin(Login);
