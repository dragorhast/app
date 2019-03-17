import React, { Component } from 'react';
import { Screen } from '../styles';
import { ModalEndRentalConfirm, ModalEndRentalBackRack } from '../components/Modals';

export default class TestScreen extends Component {
  render() {
    return (
      <Screen>
        <ModalEndRentalConfirm
          isVisible
          rentalInfo={{ startTime: new Date(2019, 2, 17).toISOString(), costSoFar: 450 }}
          getRentalInfo={() => {}}
        />
        {/* <ModalEndRentalBackRack isVisible /> */}
      </Screen>
    );
  }
}
