import styled from 'styled-components';

export const SInline = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

export const SSmallScreenTransition = styled.div`
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
