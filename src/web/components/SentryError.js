import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';

/**
 * Unsure exactly what this is used for but its reccomended
 * in the docs
 *
 * I think this may be used to wrap components.
 *
 * Even without this errors are still reported to sentry
 */

// Sentry.init({
//  dsn: "https://3328a2115ba242c4a0f50fb5107b1513@sentry.io/1296250"
// });
// should have been called before using it here
// ideally before even rendering your react app

class SentryError extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    error: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({ error });
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      // render fallback UI
      return <a onClick={() => Sentry.showReportDialog()}>Report feedback</a>;
    }
    // when there's not an error, render children untouched
    return children;
  }
}
