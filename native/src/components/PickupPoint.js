import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, H3, Text } from 'native-base';
import { goToLocation } from '../../shared/util/geo-location';
import { CardMediumShadow, StyledInline } from '../styles';
import { PickupPropTypes } from '../../shared/redux/ducks/pickups';
import withReservationCreation from '../../shared/redux/containers/ReservationCreationContainer';

const PickupPoint = ({ point, startReserveCreate, openReservation }) => (
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
          openReservation();
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
        onPress={() => goToLocation(point.centerCoordinates)}
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
  openReservation: PropTypes.func.isRequired,
};

export default withReservationCreation(PickupPoint);
