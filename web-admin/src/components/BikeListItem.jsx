import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SListItem } from '../styles/components/SidePanelSections';
import { BikePropTypes } from '../shared/redux/ducks/bikeSingle';

const SStatus = styled.span`
  color: ${props => {
    switch (props.status) {
      case 'Available' || 'Rented':
        return props.theme.success;
      default:
        return '';
    }
  }};
`;
const BikeListItem = ({ bike, selectBike }) => (
  <SListItem onClick={() => selectBike(bike)}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span>{bike.id}</span>
      <span>{bike.locationName}</span>
    </div>
    <SStatus status={bike.status}> {bike.status}</SStatus>
  </SListItem>
);

BikeListItem.propTypes = {
  bike: PropTypes.shape({
    ...BikePropTypes,
  }).isRequired,
  selectBike: PropTypes.func.isRequired,
};

export default BikeListItem;
