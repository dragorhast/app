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
            <PickupListItem key={pickup.pickupId} pickup={pickup} selectPickup={this.selectPickup} />
          ))}
      </SSideComponent>
    );
  }
}

Pickups.propTypes = {
  ...PickupProps,
  smallScreen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withPickups(Pickups);
