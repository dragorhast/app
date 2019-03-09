import styled from 'styled-components';
import { MID_RANGE_BREAK_POINT } from '../constants';

export const SSingleScreen = styled.div`
  padding: 32px;
  width: 80%;

  @media screen and (max-width: ${props => props.breakpoint || `${MID_RANGE_BREAK_POINT}px`}) {
    // Reduced margin + centers its self
    width: 90%;
    justify-self: center;
    display: flex;
    flex-direction: column;
    //align-items: center;
  }
`;

export const SSingleHeading = styled.h1`
  text-align: center;
`;

export const SInfoRowToColumn = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;

  @media screen and (max-width: ${props => props.breakpoint || `${MID_RANGE_BREAK_POINT}px`}) {
    flex-direction: column;
  }
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 16px;
`;

export const SInfoWith2ColumnsForLabelAndText = styled.div`
  display: grid;
  grid-template-columns: 37.5% 57.5%;
  grid-column-gap: 5%;
  grid-row-gap: 8px;
  max-width: 640px;
`;

export const SInfoLabelAndText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end; // aligns on bottom edge
  flex: 1;
`;

export const SInfoLabelSmaller = styled.span`
  font-size: 22px;
  width: 120px;
  ${props => props.primary && 'color: lightblue;'} // TODO change primary
`;

export const SInfoText = styled.span`
  font-size: 32px;
  margin-right: 16px;
  ${props => props.primary && 'color: lightblue;'} // TODO change primary
`;
