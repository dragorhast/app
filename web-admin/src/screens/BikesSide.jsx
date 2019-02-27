import React from 'react';
import styled from 'styled-components';
import withBikes, { BikesProps } from '../shared/redux/containers/BikesContainer';
import ControlArrows from '../components/ControlArrows';
import BikeSingleList from '../components/BikeSingleList';

// TODO move to shared styles
const SSideComponent = styled.div`
  height: 100%;
  border-right: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// TODO move to shared styles
const SControlBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 32px;
  justify-content: space-between;
  padding: 0 16px;
  box-sizing: border-box;
  border-bottom: 2px solid lightgrey;
`;

class BikeSide extends React.PureComponent {

  componentWillMount() {
    const { fetchBikes } = this.props;
    fetchBikes();
  }

  render(){
    const { bikes } = this.props;
    return(
      <SSideComponent>
        <SControlBar>
          <ControlArrows label="Location" onUpPress={() => console.log("up press")} onDownPress={() => console.log("down press")} />
          <ControlArrows label="Status" onUpPress={() => console.log("up press")} onDownPress={() => console.log("down press")} />
        </SControlBar>
        { bikes && bikes.map((bike, index) => (
          <BikeSingleList key={bike.id + index} id={bike.id} location={bike.locationName || bike.locationCoordinates} status={bike.status} />
        ))}
      </SSideComponent>
    );
  }
}

BikeSide.propTypes = {
  ...BikesProps,
};

export default withBikes(BikeSide);
