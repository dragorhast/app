import React from 'react';
import PropTypes from 'prop-types';
import { H2, Text, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { CardMediumShadow, StyledInline } from '../styles';
import { prettyDateTime } from '../../shared/util';
import { goToLocation } from '../../shared/util/geo-location';
import { ReservationDisplaySingle } from '../../shared/redux/ducks/reservationDisplay';

const ReservationCard = ({ cancelReservation, reservation, viewFullReservation }) => (
  <CardMediumShadow padding={8}>
    <TouchableOpacity onPress={() => viewFullReservation(reservation)}>
      <StyledInline>
        <Text>{prettyDateTime(reservation.datetime)}</Text>
        <Icon
          name="close"
          ios="ios-close"
          anroid="close"
          style={{ fontSize: 24, color: 'green' }}
          onPress={() =>
            cancelReservation({
              id: reservation.reservationId,
              pickupName: reservation.pickupName,
              datetime: reservation.datetime,
            })
          }
        />
      </StyledInline>
      <StyledInline>
        <H2>{reservation.pickupName}</H2>
        <Icon
          name="ios-walk"
          ios="ios-walk"
          anroid="md-walk"
          style={{ fontSize: 40, color: 'green' }}
          onPress={() => goToLocation(reservation.pickupLocation)}
        />
      </StyledInline>
    </TouchableOpacity>
  </CardMediumShadow>
);

ReservationCard.propTypes = {
  cancelReservation: PropTypes.func.isRequired,
  viewFullReservation: PropTypes.func.isRequired,
  reservation: PropTypes.shape({
    ...ReservationDisplaySingle,
  }).isRequired,
};

export default ReservationCard;
