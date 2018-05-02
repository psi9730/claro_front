import {DeviceActions, DeviceTypes} from '../modules/registerdevice/RegisterDeviceState';
import {RemoteActions, RemoteTypes} from '../modules/remote/remoteState';
export {
  DeviceTypes,
  RemoteTypes,
}
export default actions = {
  ...DeviceActions,
  ...RemoteActions,
};
