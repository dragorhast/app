import React from 'react';
import styled from 'styled-components';
import withPickupPoints, { PickupProps } from '../shared/redux/containers/PickupPointsContainer';
import { SSingleScreen, SSingleHeading, SInfoLabelAndText, SInfoText } from '../styles/components/InfoSections';
import BikeList from '../components/BikeList';

const S50Grid = styled.div`
  display: grid;
  width: 100%;
  // 320px minimum and 1fr forces all to be the same size - will
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 16px;
`;

class PickupSingle extends React.PureComponent {
  componentWillMount() {
    const { pickup, fetchSinglePickup, match, fetchPickupBikes } = this.props;
    const pickupId = match.params.id;
    if (!pickup.pickupId) {
      fetchSinglePickup(pickupId);
    }

    fetchPickupBikes(pickupId);
    // fetchPickupReservation();
  }

  render() {
    const { pickup, pickupPointBikes } = this.props;
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
            <BikeList bikes={pickupPointBikes} selectBike={() => {}} />
          </div>
          <div>
            <h2 style={{ textAlign: 'center' }}>Issues</h2>
            <BikeList bikes={pickupPointBikes} selectBike={() => {}} />
          </div>
        </S50Grid>
      </SSingleScreen>
    );
  }
}

PickupSingle.propTypes = {
  ...PickupProps,
};

export default withPickupPoints(PickupSingle);
