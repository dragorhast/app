import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withPickups, { PickupProps } from '../../shared/redux/containers/PickupPointsContainer';
import ControlArrows from '../../components/ControlArrows';
import PickupListItem from '../../components/PickupListItem';
import { SSideComponent, SControlBar } from '../../styles/components/SidePanelSections';
import MapToListTabs from '../../components/MapToListTabs';
import { withPickupFilter, PickupFilterProps } from '../../shared/redux/containers/Filters/PickupFilters';

class Pickups extends React.PureComponent {
  componentWillMount() {
    const { getPickupPoints } = this.props;
    getPickupPoints();
  }

  /**
   * Sets display pickup in redux then
   * re-routes to single page display
   *
   * @param pickup
   * @returns {Promise<void>}
   */
  selectPickup = async pickup => {
    const { setSinglePickupDisplay, history } = this.props;
    await setSinglePickupDisplay({ ...pickup });
    history.push(`/pickups/single/${pickup.pickupId}`);
  };

  render() {
    const { pickups, smallScreen, setPickupNameOrderAsc, setPickupStatusOrderAsc } = this.props;

    return (
      <SSideComponent>
        {smallScreen && <MapToListTabs listView linkToMap="/pickups/map" />}
        <SControlBar>
          <ControlArrows
            label="Name"
            onUpPress={() => setPickupNameOrderAsc(true)}
            onDownPress={() => setPickupNameOrderAsc(false)}
          />
          <ControlArrows
            label="Status"
            onUpPress={() => setPickupStatusOrderAsc(true)}
            onDownPress={() => setPickupStatusOrderAsc(false)}
          />
        </SControlBar>
        {pickups &&
          pickups.map(pickup => (
            <PickupListItem key={pickup.pickupId} pickup={pickup} selectPickup={this.selectPickup} />
          ))}
        {pickups.length === 0 && <h3 style={{ textAlign: 'center', fontStyle: 'italic' }}>No Pickups</h3>}
      </SSideComponent>
    );
  }
}

Pickups.propTypes = {
  ...PickupProps,
  ...PickupFilterProps,
  smallScreen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  withPickups,
  withPickupFilter
)(Pickups);
