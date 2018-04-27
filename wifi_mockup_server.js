const net = require('net');
const log = require('loglevel');

log.enableAll();

const server = net.createServer((client) => {
  log.info('Client connected');
  client.on('data', (data) => {
    log.info('Client sent: ', data);
    const origin = Buffer.from(data);
    const length = origin.slice(0, 4).readUInt32LE();
    log.info('length: ', length);
    const dataType = origin.slice(8, 10).readUInt16LE();
    log.info('dataType: ', dataType.toString(16));
    let response = 'wrong dataType';
    if (dataType === 0x0100) {
      let index = 20;
      log.info('serial number: ', origin.slice(index, index += 32).toString('utf8'));

      response = Buffer.from([
        0x44, 0x00, 0x00, 0x00,
        0x75, 0x89, 0x79, 0x87,
        0x01, 0x01,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03, 0x00,
        0x00, 0x70,
        0x38, 0x34, 0x37, 0x32, 0x30, 0x37, 0x31, 0x31, 0x32, 0x32,
        0x33, 0x33, 0x00, 0x00, 0x00, 0x00,
        0x41, 0x57, 0x2D, 0x31, 0x32, 0x33, 0x48, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00,
      ]);
    } else if (dataType === 0x0200) {
      let index = 20;
      const uriCount = origin.slice(index, index += 2).readUInt16LE();
      log.info('uri count: ', uriCount);

      for (let i = 0; i < uriCount; i += 1) {
        const uriLen = origin.slice(index, index += 2).readUInt16LE();
        log.info('uri', i, ' length: ', uriLen);
        log.info('uri', i, ': ', origin.slice(index, index += uriLen).toString('utf8'));
      }

      response = Buffer.from([
        0x11, 0x00, 0x00, 0x00,
        0x75, 0x89, 0x79, 0x87,
        0x01, 0x02,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00,
      ]);
    } else if (dataType === 0x0300) {
      let index = 20;
      const ssidLen = origin.slice(index, index += 2).readUInt16LE();
      log.info('ssid length: ', ssidLen);
      log.info('ssid: ', origin.slice(index, index += ssidLen).toString('utf8'));
      const pwLen = origin.slice(index, index += 2).readUInt16LE();
      log.info('pw length: ', ssidLen);
      log.info('pw: ', origin.slice(index, index += pwLen).toString('utf8'));
      log.info('wep: ', origin.slice(index, index += 2).toString('utf8'));
      log.info('bssid: ', origin.slice(index, index += 6).toString('hex'));

      response = Buffer.from([
        0x11, 0x00, 0x00, 0x00,
        0x75, 0x89, 0x79, 0x87,
        0x01, 0x03,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
      ]);
    }

    client.write(response);
  });
  client.on('end', () => {
    log.info('Client disconnected');
  });
});
server.listen(46010, () => {
  log.info('Server listening for connection');
});
