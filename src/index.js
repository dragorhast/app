/**
 * My route
 *
 * Used for passing in props to the router
 * and also displaying Toasts
 *
 * - connect to redux errors + successes
 * - display loading if loading
 * - pass in Firebase user
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'native-base';
import { connect } from 'react-redux';
import { Firebase } from '../shared/constants/firebase';
import Router from './router';
import Loading from './screens/Loading';

class MyRoute extends React.Component {
  state = {
    stateLoading: true,
    firebaseUser: undefined,
  };

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = Firebase.auth().onAuthStateChanged(user => {
      this.setState({
        stateLoading: false,
        firebaseUser: user,
      });
    });
  }

  /**
   * Calls Toast if error or success
   * @param prevProps
   */
  componentDidUpdate(prevProps) {
    const { error, success, reduxLoading } = this.props;
    const { stateLoading } = this.state;

    // Check if change
    const errorChange = prevProps.error !== error;
    const successChange = prevProps.success !== success;

    if ((errorChange || successChange) && !reduxLoading && !stateLoading) {
      console.log(errorChange ? error : success);
      Toast.show({
        position: 'top',
        duration: 5000,
        buttonText: 'okay',
        type: errorChange ? 'danger' : 'success',
        text: errorChange ? error : success,
      });
    }
  }

  /**
   * Don't forget to stop listening for authentication state changes
   * when the component unmounts.
   */
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
    const { stateLoading, firebaseUser } = this.state;

    if (stateLoading) return <Loading />;

    return <Router user={firebaseUser} />;
  }
}

const mapStateToProps = ({ status }) => ({
  reduxLoading: status.loading,
  error: status.error,
  success: status.success,
});

export default connect(mapStateToProps)(MyRoute);
