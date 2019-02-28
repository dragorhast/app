import React from 'react';
import withPickups, { PickupProps } from "../../shared/redux/containers/PickupPointsContainer";
import ControlArrows from '../../components/ControlArrows';
import PickupListItem from '../../components/PickupListItem';
import { SSideComponent, SControlBar } from "../../styles/sidePanelStyles";

class Pickups extends React.PureComponent {
  componentWillMount() {
    const { getPickupPoints } = this.props;
    getPickupPoints();
  }

  render(){
    const { pickups } = this.props;

    return(
      <SSideComponent>
        <SControlBar>
          <ControlArrows label="Name" onUpPress={() => console.log("up press")} onDownPress={() => console.log("down press")} />
          <ControlArrows label="Status" onUpPress={() => console.log("up press")} onDownPress={() => console.log("down press")} />
        </SControlBar>
        { pickups && pickups.map(pickup => <PickupListItem key={pickup.pickupId} id={pickup.pickupId} name={pickup.name} status={pickup.status}/>)}
      </SSideComponent>
    )
  }
}

export default withPickups(Pickups);
