import React from 'react';
import PropTypes from 'prop-types';
import { SControlBar } from '../styles/components/SidePanelSections';
import BikeListItem from './BikeListItem';
import ControlArrows from './ControlArrows';
import { BikePropTypes } from '../shared/redux/ducks/bikes';
import { withBikesFilters, BikesFiltersProps } from '../shared/redux/containers/Filters/BikesFilters';
import { SList } from '../styles/components/Common';

class BikesList extends React.PureComponent {
  render() {
    const { bikes, selectBike, setBikesLocationOrderAsc, setBikesStatusFilterAsc } = this.props;
    return (
      <SList>
        <SControlBar>
          <ControlArrows
            label="Location"
            onUpPress={() => setBikesLocationOrderAsc(false)}
            onDownPress={() => setBikesLocationOrderAsc(true)}
          />
          <ControlArrows
            label="Status"
            onUpPress={() => setBikesStatusFilterAsc(false)}
            onDownPress={() => setBikesStatusFilterAsc(true)}
          />
        </SControlBar>
        {bikes && bikes.map(bike => <BikeListItem key={bike.id} bike={bike} selectBike={() => selectBike(bike)} />)}
        {bikes.length === 0 && <h3 style={{ textAlign: 'center', fontStyle: 'italic' }}>No Bikes</h3>}
      </SList>
    );
  }
}

BikesList.propTypes = {
  ...BikesFiltersProps,
  bikes: PropTypes.arrayOf(
    PropTypes.shape({
      ...BikePropTypes,
    })
  ).isRequired,
  selectBike: PropTypes.func.isRequired,
};

// TODO create + wrap in with bike controls
export default withBikesFilters(BikesList);
