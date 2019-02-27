import React from 'react';
import styled from 'styled-components';

const SListItem = styled.div`
  // flex set up
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start; 
  // height + width
  width: 100%;
  // in from size
  padding: 8px 16px;
  box-sizing: border-box;
  
  border: 2px solid  lavender;
`;

// TODO remove out in to common styled
const SInline = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

// TODO set all colours from base styled
const SStatus = styled.span`
  color: ${props =>
  ((props.status === 'Available' || props.status === 'Rented') && 'green')
  }
`;
const BikeSingleList = ({ id, location, status }) => (
  <SListItem>
    {id}
    <SInline>{location} <SStatus status={status}> {status}</SStatus></SInline>
  </SListItem>
);

export default BikeSingleList;
