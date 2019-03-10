import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withPickupPoints, { PickupProps } from '../shared/redux/containers/PickupPointsContainer';
import { SSingleScreen, SSingleHeading, SInfoLabelAndText, SInfoText } from '../styles/components/InfoSections';
import BikesList from '../components/BikesList';
import ReservationList from '../components/ReservationsList';

const S50Grid = styled.div`
  display: grid;
  width: 100%;
  // 320px minimum and 1fr forces all to be the same size - will
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 16px;
`;

class PickupSingle extends React.PureComponent {
  componentWillMount() {
    const { pickup, fetchSinglePickup, fetchPickupBikes, fetchPickupReservations, match } = this.props;
    const pickupId = match.params.id;
    if (!pickup.pickupId) fetchSinglePickup(pickupId);

    fetchPickupBikes(pickup.pickupId);
    fetchPickupReservations(pickup.pickupId);
  }

  /**
   * If there is a change in the pickupId
   * then  fetch the bikes + reservations
   * for the new pickup point
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const { pickup, fetchPickupBikes, fetchPickupReservations } = this.props;
    if (pickup.pickupId !== prevProps.pickup.pickupId) {
      fetchPickupBikes(pickup.pickupId);
      fetchPickupReservations(pickup.pickupId);
    }
  }

  render() {
    const { pickup, pickupPointBikes, pickupPointReservations } = this.props;
    return (
      <SSingleScreen>
        <SSingleHeading>{pickup.name} Details</SSingleHeading>
        <S50Grid>
          <SInfoLabelAndText>
            <SInfoText>Bikes at Location</SInfoText>
            <SInfoText>{pickupPointBikes.length}</SInfoText>
          </SInfoLabelAndText>
          <SInfoText>Bikes Available</SInfoText>
          <SInfoText>Bikes with Issues</SInfoText>
          <SInfoText>Bikes Reserved</SInfoText>
          <div>
            <h2 style={{ textAlign: 'center' }}>Bikes</h2>
            <BikesList bikes={pickupPointBikes} selectBike={() => {}} />
          </div>
          <div>
            <h2 style={{ textAlign: 'center' }}>Reservations</h2>
            <ReservationList reservations={pickupPointReservations} selectReservation={() => {}} />
          </div>
        </S50Grid>
      </SSingleScreen>
    );
  }
}

PickupSingle.propTypes = {
  ...PickupProps,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withPickupPoints(PickupSingle);
