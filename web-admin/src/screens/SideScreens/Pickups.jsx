import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withPickups, { PickupProps } from '../../shared/redux/containers/PickupPointsContainer';
import ControlArrows from '../../components/ControlArrows';
import PickupListItem from '../../components/PickupListItem';
import { SSideComponent, SControlBar } from '../../styles/sidePanelStyles';
import { SSmallScreenTabs } from '../../styles/commonStyles';

class Pickups extends React.PureComponent {
  componentWillMount() {
    const { getPickupPoints } = this.props;
    getPickupPoints();
  }

  render() {
    const { pickups, smallScreen } = this.props;

    return (
      <SSideComponent>
        {smallScreen && (
          <SSmallScreenTabs>
            <Link to="/pickups/map">
              <h2>Map View</h2>
            </Link>
          </SSmallScreenTabs>
        )}
        <SControlBar>
          <ControlArrows
            label="Name"
            onUpPress={() => console.log('up press')}
            onDownPress={() => console.log('down press')}
          />
          <ControlArrows
            label="Status"
            onUpPress={() => console.log('up press')}
            onDownPress={() => console.log('down press')}
          />
        </SControlBar>
        {pickups &&
          pickups.map(pickup => (
            <PickupListItem key={pickup.pickupId} id={pickup.pickupId} name={pickup.name} status={pickup.status} />
          ))}
      </SSideComponent>
    );
  }
}

Pickups.propTypes = {
  ...PickupProps,
  smallScreen: PropTypes.bool.isRequired,
};

export default withPickups(Pickups);
