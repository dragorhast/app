import React from 'react';
import styled from 'styled-components';

const StyledNavbar = styled.header`
  position: sticky;
  top: 0; /* Distance from top to stick to*/
  background-color: darkslategray; // TODO change to primary
  height: 80px;
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

class Navbar extends React.PureComponent {
  render(){
    return(
      <StyledNavbar>
        <h2>Tap 2 Go</h2>
      </StyledNavbar>
    );
  }
}

export default Navbar;