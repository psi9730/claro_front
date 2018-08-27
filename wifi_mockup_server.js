const net = require('net');
const log = require('loglevel');

log.enableAll();

const server = net.createServer((client) => {
  client.on('data', (data) => {
    const origin = Buffer.from(data);
    const length = origin.slice(0, 4).readUInt32LE();
    const dataType = origin.slice(8, 10).readUInt16LE();
    let response = 'wrong dataType';
    if (dataType === 0x0100) {
      let index = 20;
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
      console.log('uri count: ', uriCount);

      for (let i = 0; i < uriCount; i += 1) {
        const uriLen = origin.slice(index, index += 2).readUInt16LE();
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
      console.log('ssid length: ', ssidLen);
      console.log('ssid: ', origin.slice(index, index += ssidLen).toString('utf8'));
      const pwLen = origin.slice(index, index += 2).readUInt16LE();
      console.log('pw length: ', ssidLen);
      console.log('pw: ', origin.slice(index, index += pwLen).toString('utf8'));
      console.log('wep: ', origin.slice(index, index += 2).toString('utf8'));
      console.log('bssid: ', origin.slice(index, index += 6).toString('hex'));

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
  console.log("disconnected");
  });
});
server.listen(46010, () => {
  console.log("listening now");
});
