import styled from 'styled-components';

export const SSideComponent = styled.div`
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // in from size
  padding: 0.5em 1em;
  box-sizing: border-box;
  border-bottom: 1px solid lavender;
  // border
  margin: 0.5em;
`;

export const SControlBar = styled(SListItem)`
  height: 64px;
  div {
    flex: 1;
  }
`;

export const SListItem3Columns = styled.div`
  display: grid;
  grid-template-columns: 29% 28% 39%;
  grid-column-gap: 2%;

  justify-items: start;
  align-items: center;
  // height + width
  width: 100%;
  height: 64px;

  padding: 8px;
  box-sizing: border-box;
  // border
  border: 1px solid lavender;
`;
