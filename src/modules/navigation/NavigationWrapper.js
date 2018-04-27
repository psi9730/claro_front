import React, {Component} from 'react';
import {AppState, Platform} from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import autoBind from 'react-autobind';

import {WIFI_SET_UP_SCREEN, SERIAL_NUMBER_SCREEN, BARCODE_SCAN_SCREEN} from '../../../screens';
import locationUtils from '../../utils/locationUtils';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}


export default function NavigationWrapper(WrappedComponent) {
  class WrappingComponent extends Component {
    constructor(props) {
      super(props);
      const {navigator} = props;
      navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
      autoBind(this);
      this.state = {
        appState: AppState.currentState,
      };
    }

    componentDidMount() {
      AppState.addEventListener('change', this._handleAppStateChange);
      if (Platform.OS === 'ios') {
        locationUtils.checkStatus();
        locationUtils.watchPosition();
      }
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        if (Platform.OS === 'ios') {
          locationUtils.checkStatus();
          locationUtils.watchPosition();
        }
      } else {
        // locationUtils.clearWatch(); // 지금은 굳이 clear하지 않음(보낼 수 있을때까지 보내봐)
      }
      this.setState({appState: nextAppState});
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }

    onNavigatorEvent(event) {
      if (event.type === 'DeepLink') {
        const link = event.link;
        let screenObj;
        switch (link) {
          case SERIAL_NUMBER_SCREEN.screen:
            screenObj = {...SERIAL_NUMBER_SCREEN};
            break;
          case WIFI_SET_UP_SCREEN.screen:
            screenObj = {...WIFI_SET_UP_SCREEN};
            break;
          case BARCODE_SCAN_SCREEN.screen:
            screenObj = {...BARCODE_SCAN_SCREEN};
            break;
        }
        this.props.navigator.resetTo(screenObj);
      } else if (event.type === 'NavBarButtonPress') {
        if (event.id === 'toggleDrawer') {
          this.props.navigator.toggleDrawer({
            side: 'left',
            animated: true,
          });
        }
      }
    }
  }

  const hoisted = hoistStatics(WrappingComponent, WrappedComponent);
  hoisted.displayName = `NavigationWrapper(${getDisplayName(WrappedComponent)})`;
  return hoisted;
}
