import React from 'react';
import styled from 'styled-components';
import { Logo, SButton, SButtonContainer } from '../styles/components/Common';

const SDashboardView = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;

  > header {
    font-size: 3em;
    font-weight: bold;
  }
  > p {
    max-width: 500px;
  }
`;

export class DashboardView extends React.Component {
  render() {
    return (
      <SDashboardView>
        <header>
          <Logo />
          &nbsp;Admin
        </header>
        <p>
          tap2go is a service created by Team Dragorhast. All rights reserved. <br />
          We're open source! All our code is available on the organization page.
        </p>
        <SButtonContainer>
          <SButton color="#6772e5">
            <a href="https://dashboard.stripe.com/" target="_blank" rel="noopener noreferrer">
              Stripe Dashboard
            </a>
          </SButton>
          <SButton primary>
            <a href="https://github.com/dragorhast/" target="_blank" rel="noopener noreferrer">
              Organization Page
            </a>
          </SButton>
        </SButtonContainer>
      </SDashboardView>
    );
  }
}
