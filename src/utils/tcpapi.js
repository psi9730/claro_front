
import net from 'react-native-tcp';
import _ from 'lodash';

import Constants from '../constants/constants';
import { makeCommonHeader, parseBufferData } from '../utils/ClaroBuffer';
import Storage, { KEYS } from '../utils/ClaroStorage';

const { TCP_HOST_NAME, TCP_PORT_NUMBER } = Constants;

export async const callApi: Function = (dataType: number, body) => {
  try {
    const client = net.connect({ port: TCP_PORT_NUMBER, host: TCP_HOST_NAME }, () => {
      const header = makeCommonHeader(dataType, body.length);
      const buf = Buffer.concat([header, body]);

      client.write(buf);
    });
    client.on('error', (error) => {
      throw new Error('error')
    });
    client.on('data', async (data) => {
      return parseBufferData(data);
    });
    client.on('close', () => {
    });
  } catch (e) {
    throw new Error('error')
  }
};