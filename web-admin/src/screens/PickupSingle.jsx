import React from 'react';
import styled from 'styled-components';
import withPickupPoints, { PickupProps } from '../shared/redux/containers/PickupPointsContainer';

const SPickupSingle = styled.div`
  padding: 16px;
`;

class PickupSingle extends React.PureComponent {
  componentWillMount() {
    const { pickup, fetchSinglePickup, match } = this.props;
    if (!pickup.pickupId) {
      fetchSinglePickup(match.params.id);
    }
  }

  render() {
    return (
      <SPickupSingle>
        <h2>Pickup Single</h2>
      </SPickupSingle>
    );
  }
}

PickupSingle.propTypes = {
  ...PickupProps,
};

export default withPickupPoints(PickupSingle);
