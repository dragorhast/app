import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SListItem } from '../styles/components/SidePanelSections';
import { PickupPropTypes } from '../shared/redux/ducks/pickups';

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
    <span>{pickup.name}</span>
    <SStatus status={pickup.status}>{pickup.status}</SStatus>
  </SListItem>
);

PickupListItem.propTypes = {
  pickup: PropTypes.shape({
    ...PickupPropTypes,
  }).isRequired,
  selectPickup: PropTypes.func.isRequired,
};

export default PickupListItem;
