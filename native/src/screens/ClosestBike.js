import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from 'native-base';
import BikeSVG from '../../assets/bicycle.svg';
import withBikeContainer, { BikeProps } from '../../shared/redux/containers/BikeContainer';
import { Screen } from '../styles';
import { goToLocation } from '../../shared/util/geo-location';
import THEME from '../styles/styledComponentTheme';

const SId = styled.Text`
  color: ${props => props.theme.font};
  font-size: 36;
`;

const SText = styled.Text`
  font-size: 24;
  margin: 16px;
`;

const SLink = styled.Text`
  color: ${props => props.theme.uiAccent};
`;

const SInfoBlock = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

class ClosestBike extends React.Component {
  render() {
    const { bike } = this.props;
    return (
      <Screen>
        <BikeSVG width={256} height={160} color={THEME.primary} />
        <SId>{bike.id}</SId>
        <SInfoBlock>
          <SText>
            {bike.distance} miles {'\n'}
            <SLink onPress={() => goToLocation(bike.coordinates)}>Directions</SLink>
          </SText>

          <Icon
            name="ios-walk"
            ios="ios-walk"
            anroid="md-walk"
            style={{ fontSize: 64, color: THEME.stop1 }}
            onPress={() => goToLocation(bike.coordinates)}
          />
        </SInfoBlock>
      </Screen>
    );
  }
}

ClosestBike.propTypes = {
  ...BikeProps,
};

export default withBikeContainer(ClosestBike);
