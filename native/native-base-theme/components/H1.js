// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    lineHeight: variables.lineHeightH1,
    fontFamily: variables.fontFamily,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    '.link': {
      color: variables.linkColor,
    },
  };

  return h1Theme;
};
