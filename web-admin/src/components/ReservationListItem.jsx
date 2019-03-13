import React from 'react';
import PropTypes from 'prop-types';
// import { S2x50PercGrid } from '../styles/components/Common';
import { SListItem } from '../styles/components/SidePanelSections';
import { ReservationDisplaySingleProps } from '../shared/redux/ducks/reservationDisplay';
import { prettyDateTime } from '../shared/util';

const ReservationListItem = ({ reservation, selectReservation }) => (
  <SListItem onClick={() => selectReservation(reservation)}>
    <span>{reservation.pickupName}</span>
    <span style={{ textAlign: 'center' }}>{prettyDateTime(reservation.datetime)}</span>
  </SListItem>
);

ReservationListItem.propTypes = {
  reservation: PropTypes.shape({
    ...ReservationDisplaySingleProps,
  }).isRequired,
  selectReservation: PropTypes.func.isRequired,
};

export default ReservationListItem;
