import React from 'react';
import styled from 'styled-components';

const SPickupSingle = styled.div`
  padding: 16px;
`;

class PickupSingle extends React.PureComponent {
  render() {
    return (
      <SPickupSingle>
        <h2>Pickup Single</h2>
      </SPickupSingle>
    );
  }
}

export default PickupSingle;
