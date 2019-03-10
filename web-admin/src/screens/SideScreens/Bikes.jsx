import React from 'react';
import PropTypes from 'prop-types';
import withBikes, { BikesProps } from '../../shared/redux/containers/BikesContainer';
import BikesList from '../../components/BikesList';
import { SSideComponent } from '../../styles/components/SidePanelSections';
import MapToListTabs from '../../components/MapToListTabs';

class Bikes extends React.PureComponent {
  componentWillMount() {
    const { fetchBikes } = this.props;
    fetchBikes();
    this.selectBike = this.selectBike.bind(this);
  }

  /**
   * Sets display pickup in redux then
   * re-routes to single page display
   *
   * @param bike
   * @returns {Promise<void>}
   */
  selectBike = async bike => {
    const { setSingleBikeDisplay, history } = this.props;
    await setSingleBikeDisplay({ ...bike });
    history.push(`/bikes/single/${bike.id}`);
  };

  render() {
    const { bikes, smallScreen } = this.props;
    return (
      <SSideComponent>
        {smallScreen && <MapToListTabs listView linkToMap="/bikes/map" />}
        <BikesList bikes={bikes} selectBike={this.selectBike} />
      </SSideComponent>
    );
  }
}

Bikes.propTypes = {
  ...BikesProps,
  smallScreen: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withBikes(Bikes);
