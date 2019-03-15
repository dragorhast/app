import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SListItem } from '../styles/components/SidePanelSections';
import { BikePropTypes } from '../shared/redux/ducks/bikeSingle';
import { ReactComponent as BikeIcon } from '../assets/bicycle.svg';

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
  <SListItem style={{ cursor: 'pointer' }} onClick={() => selectBike(bike)}>
    <BikeIcon style={{ height: '3em', width: '2em', marginRight: '1em' }} />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 'bold' }}>{bike.id}</span>
      <span style={{ color: '#aaa', fontSize: '0.8em' }}>{bike.locationName}</span>
    </div>
    <SStatus style={{ marginLeft: 'auto' }} status={bike.status}>
      {bike.status}
    </SStatus>
  </SListItem>
);

BikeListItem.propTypes = {
  bike: PropTypes.shape({
    ...BikePropTypes,
  }).isRequired,
  selectBike: PropTypes.func.isRequired,
};

export default BikeListItem;
