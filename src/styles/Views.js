import styled from 'styled-components/native';
import { Platform, Dimensions } from 'react-native';

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
  background-color: #fff;
  padding: 8px;
`;
