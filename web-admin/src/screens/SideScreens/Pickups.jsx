import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withPickups, { PickupProps } from '../../shared/redux/containers/PickupPointsContainer';
import ControlArrows from '../../components/ControlArrows';
import PickupListItem from '../../components/PickupListItem';
import { SSideComponent, SControlBar } from '../../styles/components/SidePanelSections';
import MapToListTabs from '../../components/MapToListTabs';
import { withPickupsFilters, PickupsFiltersProps } from '../../shared/redux/containers/Filters/PickupsFilters';
import { SList } from '../../styles/components/Common';

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
        <SList>
          {smallScreen && <MapToListTabs listView linkToMap="/pickups/map" />}
          <SControlBar>
            <ControlArrows
              label="Name"
              onUpPress={() => setPickupNameOrderAsc(false)}
              onDownPress={() => setPickupNameOrderAsc(true)}
            />
            <ControlArrows
              label="Status"
              onUpPress={() => setPickupStatusOrderAsc(false)}
              onDownPress={() => setPickupStatusOrderAsc(true)}
            />
          </SControlBar>
          {pickups &&
            pickups.map(pickup => (
              <PickupListItem key={pickup.pickupId} pickup={pickup} selectPickup={this.selectPickup} />
            ))}
          {pickups.length === 0 && <h3 style={{ textAlign: 'center', fontStyle: 'italic' }}>No Pickups</h3>}
        </SList>
      </SSideComponent>
    );
  }
}

Pickups.propTypes = {
  ...PickupProps,
  ...PickupsFiltersProps,
  smallScreen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  withPickups,
  withPickupsFilters
)(Pickups);
