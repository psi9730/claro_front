import {DeviceActions, DeviceTypes} from '../modules/registerdevice/RegisterDeviceState';
import {RemoteActions, RemoteTypes} from '../modules/remote/remoteState';
import {LoginActions, LoginTypes} from '../modules/login/LoginState';
export {
  DeviceTypes,
  RemoteTypes,
  LoginTypes,
}
export default actions = {
  ...DeviceActions,
  ...LoginActions,
  ...RemoteActions,
};
