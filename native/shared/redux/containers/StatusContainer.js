import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setStatus } from '../ducks/status';

export const StatusProps = {
  reduxLoading: PropTypes.bool.isRequired,
  reduxError: PropTypes.string,
  reduxSuccess: PropTypes.string,
  clearStatus: PropTypes.func,
};
export default function withStatus(WrappedComponent) {
  class StatusContainer extends React.PureComponent {
    render() {
      const { reduxLoading, reduxError, reduxSuccess, ...restProps } = this.props;
      return (
        <WrappedComponent
          reduxLoading={reduxLoading}
          reduxError={reduxError}
          reduxSuccess={reduxSuccess}
          {...restProps}
        />
      );
    }
  }

  StatusContainer.propTypes = {
    ...StatusProps,
  };

  const mapStateToProps = state => ({
    reduxLoading: state.status.loading,
    reduxError: state.status.error,
    reduxSuccess: state.status.success,
  });

  const mapDispatchToProps = dispatch => ({
    clearStatus: () => dispatch(setStatus('error', 'something')),
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(StatusContainer);
}
