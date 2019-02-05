import React from 'react';
import PropTypes from 'prop-types';
import getDirections from 'react-native-google-maps-directions';
import { Button, Icon, H3, Text, View } from 'native-base';
import { CardMediumShadow, StyledInline } from '../styles';
import { PickupPropTypes } from '../../shared/redux/ducks/pickups';

const goToLocation = latAndLng => {
  getDirections({
    destination: latAndLng,
    params: [
      {
        key: 'travelmode',
        value: 'walking',
      },
      {
        key: 'dir_action',
        value: 'navigate',
      },
    ],
  });
};

const PickupPoint = ({ point }) => (
  <CardMediumShadow style={{ width: '90%' }}>
    <StyledInline>
      <H3>{point.name}</H3>
      <Text>{point.distance} Miles</Text>
    </StyledInline>
    <StyledInline>
      <Button small>
        <Text>RESERVE</Text>
      </Button>
      <Icon
        name="iso-walk"
        ios="ios-walk"
        anroid="md-walk"
        style={{ fontSize: 40, color: 'green' }}
        onPress={() => goToLocation({ latitude: point.coordinates[0], longitude: point.coordinates[1] })}
      />
    </StyledInline>
  </CardMediumShadow>
);

PickupPoint.propTypes = {
  point: PropTypes.shape({
    ...PickupPropTypes,
  }).isRequired,
};

export default PickupPoint;
