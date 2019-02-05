import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';
import { Textarea } from 'native-base';

const deviceHeight = Dimensions.get('window').height;
/**
 * Main view for each screen
 */
export const Screen = styled.View`
  flex: 1;
  height: ${Platform.OS === 'ios' ? deviceHeight : deviceHeight - 20};
  flex-direction: column;
  /*
  Everything starts from center and fills up,
  to make top of screen just make content View 
  flex: 1 and then put text at top
   */
  justify-content: center;
  align-items: center;
  background-color: #ffff;
  padding: 8px;
`;

export const BreakLine = styled.View`
  height: 2px;
  border-bottom-width: 2px;
  border-bottom-color: ${props => props.color || 'grey'};
  width: ${props => props.width || '100%'};
`;

export const StyledModal = styled.View`
  height: 80%;
  background-color: white;
  border-radius: 8px;
  padding: 16px 8px;
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.5);
`;

export const Card = styled.View`
  flex-direction: column;
  justify-content: space-between;
  background-color: #ffffff;
  align-self: center;
  padding: 8px 16px;
  border-radius: 8;
`;

export const CardMediumShadow = styled(Card)`
  box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.1);
  margin: 8px;
`;

export const ShadowedTextArea = styled(Textarea)`
  /*box-shadow: 0 4px 6px hsla(0, 0%, 0%, 0.9);*/
  border-radius: 8px;
  margin-bottom: 16;
`;

export const StyledInline = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
