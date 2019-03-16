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
  width: max-content;
  font-weight: bold;
  font-size: 1.2em;
  color: inherit;
  padding: 0.4em 0.8em;
  cursor: pointer;
  &:hover {
    background-color: #e9e9e9};
  }
  ${props => `border: 1px solid ${props.theme.outlineColor};`}

  :hover {
    opacity: 0.6;
    cursor: pointer;
  }

  // when pressed
  :active {
    opacity: 0.4;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ${props =>
    props.primary &&
    `
  background-color: ${props.theme.primary};
  color: white;
  border: none;
  `}

  ${props =>
    props.danger &&
    `
  background-color: ${props.theme.danger};
  color: white;
  border: none;
  `}
  
  ${props =>
    props.disabled &&
    `
      background-color: grey;
      color: black;
      opacity: 0.8;
      
      // don't change anything on hover
      :hover {
        cursors: default;
        opacity: 0.8;
      }
    `}
`;

export const SSuccessSpan = styled.span`
  color: ${props => props.theme.success};
`;

export const SErrorSpan = styled.span`
  color: ${props => props.theme.error};
`;

export const Logo = styled.span`
  font-family: Poppins, sans-serif;
  font-weight: bold;
  &:after {
    content: 'tap2go';
  }
`;

export const SList = styled.div`
  width: 100%;
  height: 100%;
  ${props => `color: ${props.theme.font};`}
`;
