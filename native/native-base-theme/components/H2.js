// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const h2Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH2,
    lineHeight: variables.lineHeightH2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    '.link': {
      color: variables.linkColor,
    },
  };

  return h2Theme;
};
