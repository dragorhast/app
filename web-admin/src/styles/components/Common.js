import styled from 'styled-components';
import { darken } from 'polished';

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

const colorize = props => {
  const color = props.primary ? props.theme.primary : props.color ? props.color : null;
  return color
    ? `
      background-color: ${color};
      color: white;
      border: none;
      
      :hover {
        opacity: 0.9;
        background-color: ${darken(0.1, color)}
      }
  `
    : '';
};

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
  ${colorize}
  a {
    text-decoration: none;
    color: inherit;
  }
`;

export const SButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  ${SButton} {
    margin: 0.5em;
  }
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

export const SIdentifier = styled.div`
  margin-left: auto;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: bold;
  > a {
    color: inherit;
  }
`;
