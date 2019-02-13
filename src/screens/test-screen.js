import React, { Component } from 'react';
import { Content } from 'native-base';
import { ScrollableScreen } from '../styles';
import ReservationCard from '../components/ReservationCard';

export default class TestScreen extends Component {
  render() {
    const array = [1, 1, 1, 1, 1, 1,1,1,1,1];
    return (
      <Content>
        <ScrollableScreen>
          {array.map(() => (
            <ReservationCard />
          ))}
          {/* <ReservationSingle /> */}
        </ScrollableScreen>
      </Content>
    );
  }
}
