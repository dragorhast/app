import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SInline } from '../styles/commonStyles';
import { SListItem } from '../styles/sidePanelStyles';
import { BikePropTypes } from '../shared/redux/ducks/bikeSingle';

// TODO set all colours from theme
const SStatus = styled.span`
  color: ${props => {
    switch (props.status) {
      case 'Available' || 'Rented':
        return 'green';
      default:
        return '';
    }
  }};
`;
const BikeListItem = ({ bike, selectBike }) => (
  <SListItem onClick={() => selectBike(bike)}>
    <SInline>
      {bike.id}
      {bike.location} <SStatus status={bike.status}> {bike.status}</SStatus>
    </SInline>
  </SListItem>
);

BikeListItem.propTypes = {
  bike: PropTypes.shape({
    ...BikePropTypes,
  }).isRequired,
  selectBike: PropTypes.func.isRequired,
};

export default BikeListItem;
