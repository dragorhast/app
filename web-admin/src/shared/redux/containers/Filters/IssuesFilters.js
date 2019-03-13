import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setIssuesFilterStatusAsc, setIssuesFilterTypeAsc, setIssuesFilterTimeAsc } from '../../ducks/issues';

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
    setIssuesStatusOrderAsc: setIssuesFilterStatusAsc,
    setIssuesTypeOrderAsc: setIssuesFilterTypeAsc,
    setIssuesTimeOrderAsc: setIssuesFilterTimeAsc,
  };

  return connect(
    null,
    mapDispatchToProps
  )(IssuesFilters);
};
