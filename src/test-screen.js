import React from 'react';
import { Screen } from './styles';

import PickupPoint from './components/PickUpPoint';

const pUpPoint = {
  name: 'Test Point 1',
  lat: 55.67,
  lng: -3.8,
  distance: 1.2,
};

const TestScreen = () => (
  <Screen>
    <PickupPoint pUpPoint={pUpPoint} />
  </Screen>
);

export default TestScreen;
