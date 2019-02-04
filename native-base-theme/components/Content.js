// @flow

import variable from '../variables/platform';

export default (variables /* : * */ = variable) => {
  const contentTheme = {
    // this is needed for some reason
    contentContainerStyle: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'orange',
    'NativeBase.Segment': {
      borderWidth: 0,
      backgroundColor: 'transparent',
    },
  };

  return contentTheme;
};
