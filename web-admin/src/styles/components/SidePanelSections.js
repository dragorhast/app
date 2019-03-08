import styled from 'styled-components';

export const SSideComponent = styled.div`
  height: calc(100vh - 64px); // height of top bar
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SControlBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 48px;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: 2px solid lightgrey;
`;

export const SListItem = styled.div`
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

  border: 2px solid lavender;
`;
