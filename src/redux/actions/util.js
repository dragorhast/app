import { JSendStatus } from '../../constants/constants';

// eslint-disable-next-line import/prefer-default-export
export const checkJSendStatus = result => {
  switch (result.status) {
    case JSendStatus.ERROR:
      return {
        message: result.message,
      };
    case JSendStatus.FAIL:
      return {
        message: result.data.message,
      };
    case JSendStatus.SUCCESS:
      return null;
    default:
      throw new Error('API result status does not match any JSend Status');
  }
};
