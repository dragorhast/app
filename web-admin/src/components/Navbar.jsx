import React from 'react';
import styled from 'styled-components';

const SNavbar = styled.header`
  position: sticky;
  top: 0; /* Distance from top to stick to*/
  background-color: darkslategray; // TODO change to primary
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;

  color: white;
`;

class Navbar extends React.PureComponent {
  render() {
    return (
      <SNavbar>
        <h2>Tap 2 Go</h2>
      </SNavbar>
    );
  }
}

export default Navbar;
