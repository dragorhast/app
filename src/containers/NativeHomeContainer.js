/**
 * Passes to the Home Page the bike rental status
 * so that the page can decide what to render
 *
 * Doesn't use the Layout props because this file
 * will always be used on the Native platform
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Home from '../native/pages/Home';
import { BikeRentalPropTypes } from '../redux/reducers/bike-rental';
import delay from '../util/delay';
import LoginComponent from '../native/pages/Login';

class NativeHomeContainer extends React.Component {
  componentWillMount() {
    const { member } = this.props;
    delay(100).then(() => {
      if (!member.email) {
        Actions.replace('homeLogin', { Layout: LoginComponent, fetchBikeRentalOnLoad: false });
      }
    });
  }

  render() {
    const { bikeRental } = this.props;
    return <Home bikeRental={bikeRental} />;
  }
}

NativeHomeContainer.propTypes = {
  member: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
  bikeRental: PropTypes.shape({
    ...BikeRentalPropTypes,
  }).isRequired,
};

const mapStateToProps = ({ bikeRental, member }) => ({
  bikeRental,
  member,
});

export default connect(mapStateToProps)(NativeHomeContainer);
