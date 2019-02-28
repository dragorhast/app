import React from 'react';
import withBikes, { BikesProps } from '../../shared/redux/containers/BikesContainer';
import ControlArrows from '../../components/ControlArrows';
import BikeListItem from '../../components/BikeListItem';
import { SSideComponent, SControlBar } from '../../styles/sidePanelStyles';

class Bikes extends React.PureComponent {
  componentWillMount() {
    const { fetchBikes } = this.props;
    fetchBikes();
  }

  render() {
    const { bikes } = this.props;
    return (
      <SSideComponent>
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
};

export default withBikes(Bikes);
