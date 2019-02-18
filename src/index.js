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
import Loading from './screens/LoadingScreen';

class MyRoute extends React.PureComponent {
  static propTypes = {
    error: PropTypes.string,
    success: PropTypes.string,
    reduxLoading: PropTypes.bool,
  };

  static defaultProps = {
    error: null,
    success: null,
    reduxLoading: false,
  };

  state = {
    stateLoading: true,
    firebaseId: undefined,
  };

  /**
   * When the App component mounts, we listen for any authentication
   * state changes in Firebase.
   *
   * This is only needed on app start
   *
   * Once subscribed, the 'user' parameter will either be null
   * (logged out) or an Object (logged in)
   */
  componentDidMount() {
    this.authSubscription = Firebase.auth().onAuthStateChanged(user => {
      this.setState({
        stateLoading: false,
        firebaseId: user ? user.uid : null,
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
    const { stateLoading, firebaseId } = this.state;
    const { reduxLoading } = this.props;

    if (stateLoading || reduxLoading) return <Loading />;

    return <Router firebaseId={firebaseId} />;
  }
}

const mapStateToProps = ({ status }) => ({
  // reduxLoading: status.loading, // this causes too many full re-renders!
  error: status.error, // TODO remove this from here
  success: status.success, // TODO remove this from here
});

export default connect(mapStateToProps)(MyRoute);
