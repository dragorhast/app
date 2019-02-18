// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const h3Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH3,
    lineHeight: variables.lineHeightH3,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    '.link': {
      color: variables.linkColor,
    },
  };

  return h3Theme;
};
