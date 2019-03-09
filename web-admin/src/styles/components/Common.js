import styled from 'styled-components';

export const SCenteredScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const SInline = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const S2x50PercGrid = styled.div`
  display: grid;
  grid-template-columns: 47.5% 47.5%;
  grid-column-gap: 5%;
  width: 100%;
`;

export const SButton = styled.button`
  border-radius: 8px;
  border: 2px solid lavender;
  padding: 8px 16px;
  font-size: 24px;

  :hover {
    background-color: lavender;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
