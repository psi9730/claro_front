// @flow

import React, {Component} from 'react';
import {Provider} from 'react-redux';
import 'es6-symbol/implement';
import { AppRegistry } from 'react-native';
import store from './src/redux/store';
import App from './src/App';

type Props = {

};

// class Easi6ForDriver extends Component<Props> {
//   render() {
//     return (
//       <Provider store={store}>
//         <App />
//       </Provider>
//     );
//   }
// }

const Easi6ForDriver = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent('easi6driver', () => Easi6ForDriver);
