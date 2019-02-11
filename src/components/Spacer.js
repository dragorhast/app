import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'native-base';

const Spacer = ({ size }) => <View style={{ width: '100%', height: size }} />;

Spacer.propTypes = {
  size: PropTypes.number,
};

Spacer.defaultProps = {
  size: 16,
};

export default Spacer;
