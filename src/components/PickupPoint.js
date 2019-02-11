import React from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import getDirections from 'react-native-google-maps-directions';
import { Button, Icon, H3, Text } from 'native-base';
import ROUTES from '../routes';
import { CardMediumShadow, StyledInline } from '../styles';
import { PickupPropTypes } from '../../shared/redux/ducks/pickups';
import withReservationCreation from '../../shared/redux/containers/ReservationCreationContainer';

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

const PickupPoint = ({ point, startReserveCreate }) => (
  <CardMediumShadow style={{ width: '90%' }}>
    <StyledInline>
      <H3>{point.name}</H3>
      <Text>{point.distance} Miles</Text>
    </StyledInline>
    <StyledInline>
      <Button
        small
        onPress={async () => {
          await startReserveCreate({ id: point.pickupId, name: point.name });
          Actions[ROUTES.ReservationCreation]();
          return Promise.resolve();
        }}
      >
        <Text>RESERVE</Text>
      </Button>
      <Icon
        name="ios-walk"
        ios="ios-walk"
        anroid="md-walk"
        style={{ fontSize: 40, color: 'green' }}
        onPress={() => goToLocation(point.coordinates)}
      />
    </StyledInline>
  </CardMediumShadow>
);

PickupPoint.propTypes = {
  point: PropTypes.shape({
    ...PickupPropTypes,
  }).isRequired,
  /* Function to start reservation. Doesn't use full container so only applying prop types of function */
  startReserveCreate: PropTypes.func.isRequired,
};

export default withReservationCreation(PickupPoint);
