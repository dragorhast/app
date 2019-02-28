import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SInline } from '../styles/commonStyles';
import { SListItem } from '../styles/sidePanelStyles';

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

const PickupListItem = ({ id, name, status }) => (
  <SListItem>
    <SInline onClick={() => console.log(id)}>
      {name} <SStatus status={status}>{status}</SStatus>
    </SInline>
  </SListItem>
);

PickupListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default PickupListItem;
