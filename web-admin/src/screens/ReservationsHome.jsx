import React from 'react';
import { SCenteredScreen } from '../styles/components/Common';

/**
 * Simple component to say that a reservation has not been selected
 * @returns {*}
 */
export default () => (
  <SCenteredScreen>
    <h1>No Reservation Selected</h1>
    <h2>{'<-- Please select one to the left'}</h2>
  </SCenteredScreen>
);
