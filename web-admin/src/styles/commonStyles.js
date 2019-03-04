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

export const SSmallScreenTabs = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey; // TODO change colour

  a {
    text-decoration: none;
    color: grey;
  }
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
