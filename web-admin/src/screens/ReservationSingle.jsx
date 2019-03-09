// In here find a way to route to the first available reservation if none are selected
import React from 'react';
import PropTypes from 'prop-types';
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
          <SInfoText>User ID:</SInfoText>
          <SInfoText>{reserveDisplay.reservationId}</SInfoText>

          <SInfoText>Rental Time:</SInfoText>
          <SInfoText>{prettyDateTime(reserveDisplay.datetime)}</SInfoText>

          <SInfoText>Status:</SInfoText>
          {/* TODO add status to api */}
          <SInfoText>Status:</SInfoText>
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
