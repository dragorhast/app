import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SCenteredScreen } from '../styles/commonStyles';

const SButton = styled.button`
  border-radius: 8px;
  border: 2px solid lavender;
  padding: 8px;
  font-size: 24px;

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default () => (
  <SCenteredScreen>
    <h3>You must be logged in to access this page</h3>
    <SButton>
      <Link to="/login">Log In</Link>
    </SButton>
  </SCenteredScreen>
);
