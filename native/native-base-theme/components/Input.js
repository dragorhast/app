// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const inputTheme = {
    '.multiline': {
      height: null,
    },
    height: variables.inputHeightBase,
    color: variables.inputColor,
    paddingLeft: 5,
    paddingRight: 5,
    flex: 1,
    fontSize: variables.inputFontSize,
    textAlign: 'left',

    '.big': {
      textAlign: 'center',
      fontSize: 32,
      height: 50,
    },
  };

  return inputTheme;
};
