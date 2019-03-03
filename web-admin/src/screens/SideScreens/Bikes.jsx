import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withBikes, { BikesProps } from '../../shared/redux/containers/BikesContainer';
import ControlArrows from '../../components/ControlArrows';
import BikeListItem from '../../components/BikeListItem';
import { SSideComponent, SControlBar } from '../../styles/sidePanelStyles';
import { SSmallScreenTransition } from '../../styles/commonStyles';

class Bikes extends React.PureComponent {
  componentWillMount() {
    const { fetchBikes } = this.props;
    fetchBikes();
  }

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
          <SSmallScreenTransition>
            <Link to="/bikes/map">
              <h2>Map View</h2>
            </Link>
          </SSmallScreenTransition>
        )}
        <SControlBar>
          <ControlArrows
            label="Location"
            onUpPress={() => console.log('up press')}
            onDownPress={() => console.log('down press')}
          />
          <ControlArrows
            label="Status"
            onUpPress={() => console.log('up press')}
            onDownPress={() => console.log('down press')}
          />
        </SControlBar>
        {bikes && bikes.map(bike => <BikeListItem key={bike.id} bike={bike} selectBike={this.selectBike} />)}
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
