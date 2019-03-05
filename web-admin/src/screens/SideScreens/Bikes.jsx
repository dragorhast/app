import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withBikes, { BikesProps } from '../../shared/redux/containers/BikesContainer';
import BikeList from '../../components/BikeList';
import { SSideComponent } from '../../styles/components/SidePanelSections';
import { SSmallScreenTabs } from '../../styles/components/Common';

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
        {smallScreen && (
          <SSmallScreenTabs>
            <Link to="/bikes/map">
              <h2>Map View</h2>
            </Link>
          </SSmallScreenTabs>
        )}
        <BikeList bikes={bikes} selectBike={this.selectBike} />
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
