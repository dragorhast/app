import React from 'react';
import PropTypes from 'prop-types';
import { SControlBar } from '../styles/components/SidePanelSections';
import BikeListItem from './BikeListItem';
import ControlArrows from './ControlArrows';
import { BikePropTypes } from '../shared/redux/ducks/bikes';
import { withBikeFilter, BikeFilterProps } from '../shared/redux/containers/Filters/BikesFilters';

class BikesList extends React.PureComponent {
  render() {
    const { bikes, selectBike, setBikesLocationOrderAsc, setBikesStatusFilterAsc } = this.props;
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <SControlBar>
          <ControlArrows
            label="Location"
            onUpPress={() => setBikesLocationOrderAsc(true)}
            onDownPress={() => setBikesLocationOrderAsc(false)}
          />
          <ControlArrows
            label="Status"
            onUpPress={() => setBikesStatusFilterAsc(true)}
            onDownPress={() => setBikesStatusFilterAsc(false)}
          />
        </SControlBar>
        {bikes && bikes.map(bike => <BikeListItem key={bike.id} bike={bike} selectBike={() => selectBike(bike)} />)}
        {bikes.length === 0 && <h3 style={{ textAlign: 'center', fontStyle: 'italic' }}>No Bikes</h3>}
      </div>
    );
  }
}

BikesList.propTypes = {
  ...BikeFilterProps,
  bikes: PropTypes.arrayOf(
    PropTypes.shape({
      ...BikePropTypes,
    })
  ).isRequired,
  selectBike: PropTypes.func.isRequired,
};

// TODO create + wrap in with bike controls
export default withBikeFilter(BikesList);
