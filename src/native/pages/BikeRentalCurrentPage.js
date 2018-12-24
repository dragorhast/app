/**
 * Page to display current rental
 *
 * Includes:
 * - Cost of rental so far
 * - Pickup Location
 * - Time been renting for <-- calculated on load
 * - Ability to lock / unlock bike
 * - Ability to put bike back
 *
 * */
import React from 'react';
import { Container, Content, Body, Button, Text } from 'native-base';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const StyledPriceText = styled.Text`
  color: blue;
  font-size: 24; // this is not an error
`;

/**
 *
 * @param rentalStartTime
 * @returns minutesBeenRentingFor
 */
const getMinutesBeenRentingFor = rentalStartTime => {
  const currentTime = new Date();
  const milliSecondsSoFar = currentTime - new Date(rentalStartTime);
  return Math.round(milliSecondsSoFar / (1000 * 60));
};

class BikeRentalCurrentPage extends React.Component {
  componentWillMount() {
    const { getRentalInfo, fetchBikeRentalOnLoad } = this.props;
    if (fetchBikeRentalOnLoad) getRentalInfo();
  }

  render() {
    const { rentalInfo, returnBike } = this.props;
    return (
      <Container>
        <Content>
          <Body>
            <StyledPriceText>{rentalInfo.costOfRentalSoFar}</StyledPriceText>
            <Text>{rentalInfo.bikeID}</Text> <Text>Bike ID</Text>
            {/* TODO also check for hours */}
            <Text>{getMinutesBeenRentingFor(rentalInfo.rentalStartTime)}</Text> <Text>Time used so far</Text>
            <Text>Pick Up Location</Text>
            <Text>{rentalInfo.pickUpPoint}</Text>
            {rentalInfo.ableToBeReturned && (
              <Button primary large onPress={returnBike}>
                <Text>RETURN BIKE</Text>
              </Button>
            )}
          </Body>
        </Content>
      </Container>
    );
  }
}
BikeRentalCurrentPage.propTypes = {
  fetchBikeRentalOnLoad: PropTypes.bool.isRequired,
  getRentalInfo: PropTypes.func.isRequired,
  returnBike: PropTypes.func.isRequired,
  rentalInfo: PropTypes.shape({
    bikeID: PropTypes.string,
    rentalStartTime: PropTypes.date,
    costOfRentalSoFar: PropTypes.number,
    rentalActive: PropTypes.bool,
    pickUpPoint: PropTypes.string,
    ableToBeReturned: PropTypes.bool,
  }).isRequired,
};

export default BikeRentalCurrentPage;
