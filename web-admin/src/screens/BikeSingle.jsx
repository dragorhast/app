import React from 'react';
import styled from 'styled-components';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';

const SBikeSingle = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const SInfoLabel = styled.span`
  font-size: 32px;
  width: 160px;
`;

const SInfoText = styled.span`
  font-size: 32px;
`;

const SInfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

class BikeSingle extends React.PureComponent {
  render() {
    const { bike } = this.props;
    return (
      <SBikeSingle>
        <SInfo>
          <h1 style={{ textAlign: 'center' }}>Bike Details</h1>
          <SInfoBlock>
            <SInfoLabel>Identifier</SInfoLabel>
            <SInfoText>{bike.id}</SInfoText>
          </SInfoBlock>
          <SInfoBlock>
            <SInfoLabel>Location</SInfoLabel>
            <SInfoText>{bike.locationName}</SInfoText>
          </SInfoBlock>
          <SInfoBlock>
            <SInfoLabel>Status</SInfoLabel>
            <SInfoText>{bike.status}</SInfoText>
          </SInfoBlock>
          <SInfoBlock>
            <SInfoLabel>Battery</SInfoLabel>
            <SInfoText>{bike.battery}%</SInfoText>
          </SInfoBlock>
        </SInfo>
        <div style={{ flex: 1 }} />
      </SBikeSingle>
    );
  }
}

BikeSingle.propTypes = {
  ...BikesProps,
};

export default withBikes(BikeSingle);
