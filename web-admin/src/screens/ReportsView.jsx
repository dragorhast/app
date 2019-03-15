import React from 'react';
import styled from 'styled-components';
import { VictoryChart, VictoryLine, VictoryArea } from 'victory';
import { VictoryPolarAxis } from 'victory-polar-axis';
import CountUp from 'react-countup';
import { apiCurrentReport, apiHistoricalReport } from '../shared/api/tap2go';
import { Firebase } from '../shared/constants/firebase';
import { ChartsStyle } from '../assets/charts-style';

const ReportsLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 350px 350px 350px 350px 1fr;
  grid-template-rows: auto 1fr 1fr;
  background: rgb(240, 242, 245);
  flex: 1;
  overflow-x: hidden;
  padding: 4em 0;
  ${props => `color: ${props.theme.font};`}
`;

const ReportSection = styled.section`
  ${props =>
    props.color
      ? `
    background-color: ${props.color};
    border-top: 5px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.1);
    margin: 0 -3em;
    padding: 1em 3em !important;
  `
      : ''}

  padding: 1em 0;
  overflow-x: auto;
  margin-bottom: 3em;

  > header {
    font-weight: bold;
    font-family: Poppins, sans-serif;
    font-size: 2em;
    margin: 0 0 0.5em 0.5em;
  }
  > div {
    flex-direction: row;
    display: flex;
    > figure {
      flex: 1;
    }
  }
`;

const FigureCard = styled.figure`
  display: flex;
  flex-direction: column;
  padding: 3em;
  background-color: white;
  margin: 0.5em;
  box-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.1);
  position: relative;

  > header {
    font-size: 2em;
    text-align: center;
    font-weight: bold;
    background-color: #fdcd11;
    border-top: 5px solid rgba(0, 0, 0, 0.3);
    margin: -1.5em -1.5em 0 -1.5em;
    padding: 0.5em;
    font-family: Poppins, sans-serif;
    box-sizing: border-box;
  }
`;

const StatCard = styled(FigureCard)`
  > div {
    text-align: center;
    flex: 1;
    font-size: 4em;
    font-weight: bold;
    font-family: Poppins, sans-serif;
  }
  > figcaption {
    text-align: center;
    opacity: 0.5;
  }
`;

const GraphCard = styled(FigureCard)`
  background-color: white;
`;

class ReportsView extends React.PureComponent {
  state = {
    currentData: {
      current_rentals: 0,
      current_reservations: 0,
      current_shortages: 0,
      connected_bikes: 0,
      active_bikes: 0,
      active_issues: 0,
    },
    historicalData: [],
  };

  constructor(props) {
    super(props);
    this.getCurrentData();
    this.getHistoricalData();
  }

  getCurrentData = async () => {
    const authToken = await Firebase.auth().currentUser.getIdToken();
    this.setState({
      currentData: await apiCurrentReport(authToken),
    });
  };

  getHistoricalData = async () => {
    const authToken = await Firebase.auth().currentUser.getIdToken();
    this.setState({
      historicalData: await apiHistoricalReport(authToken),
    });
  };

  groupData = (data, keyList) => {
    return keyList.map(key =>
      data.map(data => {
        return {
          x: data.date,
          y: data[key],
        };
      })
    );
  };

  render() {
    const { currentData, historicalData } = this.state;

    const [rentalsStarted, rentalsEnded, distanceTravelled, revenue] = this.groupData(historicalData, [
      'rentals_started',
      'rentals_ended',
      'distance_travelled',
      'revenue',
    ]);

    let dayDistance = { Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0 };
    distanceTravelled.forEach(({ x, y }) => {
      const date = new Date(x);
      const day = Object.keys(dayDistance)[date.getDay()];
      dayDistance[day] += y;
    });

    dayDistance = Object.entries(dayDistance).map(([day, meters]) => {
      return { x: day, y: meters };
    });

    return (
      <ReportsLayout>
        <ReportSection style={{ gridArea: '1 / 2 / 2 / 6' }} color="#fdcd11">
          <header>Right now</header>
          <div>
            <StatCard>
              <div>
                <CountUp end={currentData.current_rentals} />
              </div>
              <figcaption>Rentals</figcaption>
            </StatCard>
            <StatCard>
              <div>
                <CountUp end={currentData.current_reservations} />
              </div>
              <figcaption>Reservations</figcaption>
            </StatCard>
            <StatCard>
              <div>
                <CountUp end={currentData.current_shortages} />
              </div>
              <figcaption>Shortages</figcaption>
            </StatCard>
            <StatCard>
              <div>
                <CountUp end={currentData.connected_bikes} />
              </div>
              <figcaption>Bikes Connected</figcaption>
            </StatCard>
            <StatCard>
              <div>
                <CountUp end={currentData.active_bikes} />
              </div>
              <figcaption>Bikes In Use</figcaption>
            </StatCard>
            <StatCard>
              <div>
                <CountUp end={currentData.active_issues} />
              </div>
              <figcaption>Open Issues</figcaption>
            </StatCard>
          </div>
        </ReportSection>
        <GraphCard style={{ gridArea: '2 / 2 / 3 / 4' }}>
          <header>Rentals Started</header>
          <VictoryChart theme={ChartsStyle}>
            <VictoryLine interpolation="natural" data={rentalsStarted} />
          </VictoryChart>
        </GraphCard>
        <GraphCard style={{ gridArea: '2 / 4 / 3 / 6' }}>
          <header>Rentals Ended</header>
          <VictoryChart theme={ChartsStyle}>
            <VictoryLine interpolation="natural" data={rentalsEnded} />
          </VictoryChart>
        </GraphCard>
        <GraphCard style={{ gridArea: '3 / 2 / 4 / 4' }}>
          <header>Distance Travelled</header>
          <VictoryChart theme={ChartsStyle}>
            <VictoryLine interpolation="natural" data={distanceTravelled} />
          </VictoryChart>
        </GraphCard>
        <GraphCard style={{ gridArea: '3 / 4 / 4 / 6' }}>
          <header>Revenue</header>
          <VictoryChart theme={ChartsStyle}>
            <VictoryLine interpolation="natural" data={revenue} />
          </VictoryChart>
        </GraphCard>
        <GraphCard style={{ gridArea: '4 / 4 / 5 / 6' }}>
          <header>Distance Travelled By Day</header>
          <VictoryChart polar theme={ChartsStyle}>
            <VictoryArea data={dayDistance} />
            <VictoryPolarAxis />
          </VictoryChart>
        </GraphCard>
      </ReportsLayout>
    );
  }
}

export default ReportsView;
