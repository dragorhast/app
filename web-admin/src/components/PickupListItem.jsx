import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SListItem } from '../styles/components/SidePanelSections';
import { PickupPropTypes } from '../shared/redux/ducks/pickups';
import { ReactComponent as PickupIcon } from '../assets/pickup.svg';

const SStatus = styled.span`
  color: ${props => {
    switch (props.status) {
      case 'High':
        return props.theme.success;
      case 'Medium':
        return props.theme.warning;
      case 'Low':
        return props.theme.danger;
      default:
        return '';
    }
  }};
`;

const PickupListItem = ({ pickup, selectPickup }) => (
  <SListItem onClick={() => selectPickup(pickup)}>
    <PickupIcon style={{ height: '1.5em', marginRight: '1em' }} />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontWeight: 'bold' }}>{pickup.name}</span>
      <span style={{ color: '#aaa', fontSize: '0.8em' }}>
        {pickup.coordinates[0].lng.toFixed(2)}, {pickup.coordinates[0].lat.toFixed(2)}
      </span>
    </div>
    <SStatus style={{ marginLeft: 'auto' }} status={pickup.status}>
      {pickup.status}
    </SStatus>
  </SListItem>
);

PickupListItem.propTypes = {
  pickup: PropTypes.shape({
    ...PickupPropTypes,
  }).isRequired,
  selectPickup: PropTypes.func.isRequired,
};

export default PickupListItem;
