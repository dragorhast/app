import styled from 'styled-components';
import { MID_RANGE_BREAK_POINT } from '../constants';

export const SSingleScreen = styled.div`
  padding: 2em;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  min-height: 100%;
  display: flex;

  @media screen and (max-width: ${props => props.breakpoint || `${MID_RANGE_BREAK_POINT}px`}) {
    // Reduced margin + centers its self
    justify-self: center;
    display: flex;
    flex-direction: column;
    //align-items: center;
  }
`;

export const SSingleHeading = styled.h1`
  text-align: center;
`;

export const SInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 16px;
`;

export const SInfoWith2ColumnsForLabelAndText = styled.div`
  align-items: center; // puts in  middle of row
  grid-column-gap: 8px;
  grid-row-gap: 16px;
  max-width: 640px;
  margin: 16px 0;
  dt {
    float: left;
  }
  dd {
    float: right;
    clear: right;
  }
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
  ${props => props.primary && `color: ${props.theme.primary};`}
`;

export const SInfoText = styled.span`
  font-size: 2em;
  margin-right: 1em;
  ${props => props.primary && `color: ${props.theme.primary};`}
`;

export const SLittleMap = styled.div`
  width: 240px;
  height: 240px;
  position: relative;
`;

export const SInfoTable = styled.table`
  td:first-child {
    font-weight: bold;
  }
`;
