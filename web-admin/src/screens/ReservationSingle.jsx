// In here find a way to route to the first available reservation if none are selected
import React from 'react';
import PropTypes from 'prop-types';
import Capitalize from 'capitalize';
// import styled from 'styled-components';
import {
  SSingleScreen,
  SSingleHeading,
  SInfoText,
  SInfoWith2ColumnsForLabelAndText,
} from '../styles/components/InfoSections';
import { prettyDateTime } from '../shared/util';
import withReservation, { ReservationDisplayProps } from '../shared/redux/containers/ReservationDisplayContainer';

class ReservationSingle extends React.PureComponent {
  componentWillMount() {
    const { reserveDisplay, fetchSingleReservation, match } = this.props;
    if (!reserveDisplay.reservationId) fetchSingleReservation(match.params.id);
  }

  render() {
    const { reserveDisplay } = this.props;
    return (
      <SSingleScreen>
        <SSingleHeading>Reservation</SSingleHeading>
        <SInfoWith2ColumnsForLabelAndText>
          <SInfoText primary>Pickup Point</SInfoText>
          <SInfoText>{reserveDisplay.pickupName}</SInfoText>

          <SInfoText primary>Rental Time</SInfoText>
          <SInfoText>{prettyDateTime(reserveDisplay.datetime)}</SInfoText>

          <SInfoText primary>User ID</SInfoText>
          <SInfoText>{reserveDisplay.reservationId}</SInfoText>

          <SInfoText primary>Status</SInfoText>
          <SInfoText>{Capitalize(reserveDisplay.status || 'status not available')}</SInfoText>
        </SInfoWith2ColumnsForLabelAndText>
      </SSingleScreen>
    );
  }
}

ReservationSingle.propTypes = {
  ...ReservationDisplayProps,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withReservation(ReservationSingle);
