import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SInline } from '../styles/components/Common';
import { SListItem } from '../styles/components/SidePanelSections';
import { PickupPropTypes } from '../shared/redux/ducks/pickups';

const SStatus = styled.span`
  color: ${props => {
    switch (props.status) {
      case 'High':
        return 'green';
      case 'Medium':
        return 'yellow';
      case 'Low':
        return 'red';
      default:
        return '';
    }
  }};
`;

const PickupListItem = ({ pickup, selectPickup }) => (
  <SListItem>
    <SInline onClick={() => selectPickup(pickup)}>
      {pickup.name} <SStatus status={pickup.status}>{pickup.status}</SStatus>
    </SInline>
  </SListItem>
);

PickupListItem.propTypes = {
  pickup: PropTypes.shape({
    ...PickupPropTypes,
  }).isRequired,
  selectPickup: PropTypes.func.isRequired,
};

export default PickupListItem;
