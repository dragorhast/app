import React from 'react';
import { H2, H3, Button, Text, Icon, View, SwipeRow } from 'native-base';
import { Alert, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CardMediumShadow, StyledInline } from '../styles';
import { goToLocation, prettyDateTime } from '../../shared/util';

/*
Little x top right
Name to left
Date to right (Function that gets a nice visual date from a date object)
View button and little green man below
 */

const cancelReservation = ({ id, pickupName, datetime }) => {
  Alert.alert(
    'Are you sure you want to cancel',
    `Reservation at ${pickupName} at ${prettyDateTime(datetime)}`,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('Cancelled') },
    ],
    { cancelable: true }
  );
};

const reservation = {
  reservationId: 1,
  pickupId: 2,
  pickupName: 'Teviot',
  pickupLocation: {
    latitude: 55.9455454,
    longitude: -3.1921757,
  },
  datetime: '2019-02-13T18:30:09.350Z',
};

const ReservationCard = ({ cancelReservation, reservation, viewFullReservation }) => (
  <CardMediumShadow style={{ width: '90%' }} padding={8}>
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
              id: reservation.id,
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

export default ReservationCard;
