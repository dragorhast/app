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
        {bikes &&
          bikes.map(bike => (
            <BikeListItem key={bike.id} id={bike.id} location={bike.locationName} status={bike.status} />
          ))}
      </SSideComponent>
    );
  }
}

Bikes.propTypes = {
  ...BikesProps,
  smallScreen: PropTypes.bool.isRequired,
};

export default withBikes(Bikes);
