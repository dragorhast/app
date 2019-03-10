import styled from 'styled-components';

export const SSideComponent = styled.div`
  height: calc(100vh - 64px); // height of top bar
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SListItem = styled.div`
  // grid
  display: grid;
  grid-template-columns: 47.5% 47.5%;
  grid-column-gap: 5%;

  justify-items: start;
  align-items: center;

  // height + width
  width: 100%;
  // in from size
  padding: 8px 16px;
  box-sizing: border-box;
  // border
  border: 1px solid lavender;
`;

export const SControlBar = styled(SListItem)`
  height: 48px;
`;

export const SListItem3Columns = styled.div`
  display: grid;
  grid-template-columns: 29% 28% 39%;
  grid-column-gap: 2%;

  justify-items: start;
  align-items: center;
  // height + width
  width: 100%;
  height: 48px;

  padding: 8px;
  box-sizing: border-box;
  // border
  border: 1px solid lavender;
`;
