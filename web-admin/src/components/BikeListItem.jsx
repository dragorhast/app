import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SInline } from '../styles/commonStyles';
import { SListItem } from '../styles/sidePanelStyles';

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
const BikeListItem = ({ id, location, status }) => (
  <SListItem>
    {id}
    <SInline>
      {location} <SStatus status={status}> {status}</SStatus>
    </SInline>
  </SListItem>
);

BikeListItem.propTypes = {
  id: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default BikeListItem;
