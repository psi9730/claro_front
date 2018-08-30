// @flow

import ConstantsDev from './constants.dev';
import ConstantsProd from './constants.prod';

const isProd = process.env.NODE_ENV === 'production';

const constants: {
  TCP_HOST_NAME: string,
  TCP_PORT_NUMBER: number,
  API_ROOT: string,
  API_ROOT_WIFI: string,
} = isProd ? ConstantsProd : ConstantsDev;

export default constants;
