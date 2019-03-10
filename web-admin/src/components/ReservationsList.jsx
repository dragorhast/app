import React from 'react';
import PropTypes from 'prop-types';
import { SControlBar } from '../styles/components/SidePanelSections';
// import { S2x50PercGrid } from '../styles/components/Common';
import ReservationListItem from './ReservationListItem';
import ControlArrows from './ControlArrows';
import { ReservationDisplaySingleProps } from '../shared/redux/ducks/reservationDisplay';
import {
  withReservationsFilters,
  ReservationsFilterProps,
} from '../shared/redux/containers/Filters/ReservationsFilters';

class ReservationsList extends React.PureComponent {
  render() {
    const { reservations, selectReservation, setReservationNameOrderAsc, setReservationTimeOrderAsc } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <SControlBar>
          <ControlArrows
            label="Pickup Points"
            onUpPress={() => setReservationNameOrderAsc(false)}
            onDownPress={() => setReservationNameOrderAsc(true)}
          />
          <ControlArrows
            label="Time"
            onUpPress={() => setReservationTimeOrderAsc(false)}
            onDownPress={() => setReservationTimeOrderAsc(true)}
          />
        </SControlBar>
        {reservations &&
          reservations.map(res => (
            <ReservationListItem
              key={res.reservationId}
              reservation={res}
              selectReservation={() => selectReservation(res)}
            />
          ))}

        {reservations.length === 0 && <h3 style={{ textAlign: 'center', fontStyle: 'italic' }}>No Reservations</h3>}
      </div>
    );
  }
}

ReservationsList.propTypes = {
  ...ReservationsFilterProps,
  reservations: PropTypes.arrayOf(
    PropTypes.shape({
      ...ReservationDisplaySingleProps,
    })
  ).isRequired,
  selectReservation: PropTypes.func.isRequired,
};

// TODO create + wrap with reservation controls
export default withReservationsFilters(ReservationsList);
