/* @flow */

import _ from 'lodash';

export const strBuffer = (value: string, length: ?number): Buffer => {
  const body: Buffer = Buffer.alloc(length != null ? length : value.length);
  body.write(value, 0);
  return body;
};

export const int16Buffer = (value: number): Buffer => {
  const body: Buffer = Buffer.allocUnsafe(2);
  body.writeInt16LE(value, 0);
  return body;
};

export const int32Buffer = (value: number): Buffer => {
  const body: Buffer = Buffer.allocUnsafe(4);
  body.writeInt32LE(value, 0);
  return body;
};

export const reservedBuffer = (length: number): Buffer => Buffer.alloc(length);

export const makeBody = (...params: Array<Buffer>) => Buffer.concat(params);

export const makeBssidBuffer = (bssid: ?string): Buffer => {
  if (!bssid) {
    return makeBody(reservedBuffer(6));
  }
  try {
    return Buffer.concat(_.map(_.split(bssid, ':'), hexStr => Buffer.from(_.padStart(hexStr, 2, '0'), 'hex')));
  } catch (e) {
    return makeBody(reservedBuffer(6));
  }
};

export const makeCommonHeader = (dataType: number, bodyLength: number): Buffer => makeBody(
  int32Buffer(bodyLength + 16),
  Buffer.from([0x75, 0x89, 0x79, 0x87]), // magic value
  int16Buffer(dataType),
  reservedBuffer(10),
);

export const parseBufferData = (data: Buffer) => {
  let origin = Buffer.from(data);
  const length = origin.readUInt32LE(0);
  const dataType = origin.readUInt16LE(8);
  if (length !== data.length - 4) {
    origin = origin.slice(0, length);
  }
  if (dataType === 0x0101) {
    console.log("dataType is 0x0101");
    const deviceCode = origin.readUInt16LE(20);
    const deviceType = origin.readUInt16LE(22);
    const deviceName = origin.toString('utf8', 24, 40);
    const modelName = origin.toString('utf8', 40, 72);
    return {
      dataType,
      deviceCode,
      deviceType,
      deviceName,
      modelName,
    };
  } else if (dataType === 0x0201 || dataType === 0x0301) {
    const resultCode = origin.readUInt8(20);
    return {
      dataType,
      resultCode,
    };
  }

  return {
    dataType,
  };
};
