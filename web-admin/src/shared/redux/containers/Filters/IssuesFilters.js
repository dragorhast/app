import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setIssuesStatusOrderAsc, setIssuesTypeOrderAsc, setIssuesTimeOrderAsc } from '../../ducks/issues';

export const IssuesFiltersProps = {
  setIssuesStatusOrderAsc: PropTypes.func,
  setIssuesTypeOrderAsc: PropTypes.func,
  setIssuesTimeOrderAsc: PropTypes.func,
};

export const withIssuesFilters = WrappedComponent => {
  class IssuesFilters extends React.PureComponent {
    render() {
      const { setIssuesStatusOrderAsc, setIssuesTypeOrderAsc, setIssuesTimeOrderAsc, ...restProps } = this.props;

      return (
        <WrappedComponent
          setIssuesStatusOrderAsc={setIssuesStatusOrderAsc}
          setIssuesTypeOrderAsc={setIssuesTypeOrderAsc}
          setIssuesTimeOrderAsc={setIssuesTimeOrderAsc}
          {...restProps}
        />
      );
    }
  }

  IssuesFilters.propTypes = {
    ...IssuesFiltersProps,
  };

  const mapDispatchToProps = {
    setIssuesStatusOrderAsc,
    setIssuesTypeOrderAsc,
    setIssuesTimeOrderAsc,
  };

  return connect(
    null,
    mapDispatchToProps
  )(IssuesFilters);
};
