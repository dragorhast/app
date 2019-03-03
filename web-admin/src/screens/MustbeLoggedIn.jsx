import React from 'react';
import { Link } from 'react-router-dom';
import { SCenteredScreen, SButton } from '../styles/commonStyles';

export default () => (
  <SCenteredScreen>
    <h3>You must be logged in to access this page</h3>
    <SButton>
      <Link to="/login">Log In</Link>
    </SButton>
  </SCenteredScreen>
);
