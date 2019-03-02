import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { SCenteredScreen } from '../styles/commonStyles';
import { Firebase } from '../shared/constants/firebase';

class Login extends React.PureComponent {
  render() {
    const signedIn = Firebase.auth().currentUser;
    return (
      <SCenteredScreen>
        <h1>Signed In: {signedIn}</h1>
      </SCenteredScreen>
    );
  }
}

export default Login;
