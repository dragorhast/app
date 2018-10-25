import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signUp, login } from '../redux/actions/member';

class SignUp extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    member: PropTypes.shape({}).isRequired,
    signUpRedux: PropTypes.func.isRequired,
    loginRedux: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    locale: PropTypes.string,
  };

  static defaultProps = {
    locale: null,
  };

  state = {
    errorMessage: null,
  };


  // Signs up then logs in through redux
  onFormSubmit = async data => {
    const { signUpRedux, loginRedux } = this.props;
    await signUpRedux(data).catch(err => {
      this.setState({ errorMessage: err });
      throw err;
    });

    return loginRedux(data);
  };

  render = () => {
    const { member, Layout, isLoading, locale } = this.props;

    const { errorMessage } = this.state;

    return (
      <Layout
        member={member}
        locale={locale}
        loading={isLoading}
        error={errorMessage}
        onFormSubmit={this.onFormSubmit}
      />
    );
  };
}

const mapStateToProps = state => ({
  member: state.member || {},
  isLoading: state.status.loading || false,
  locale: state.locale || null,
});

const mapDispatchToProps = {
  signUpRedux: signUp,
  loginRedux: login,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
