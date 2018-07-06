import React, {Component} from 'react';
import {AppState, Platform} from 'react-native';
import hoistStatics from 'hoist-non-react-statics';
import autoBind from 'react-autobind';
import { Alert,
  BackAndroid,
} from 'react-native';

import {WIFI_SET_UP_SCREEN, DEVICE_SELECT_SCREEN, WIFI_SET_UP_TEMP_SCREEN, DEVICE_ADD_SCREEN, DEVICE_INFO_SCREEN, WIFI_SOLUTION_SCREEN, TIMER_SCREEN, SERIAL_NUMBER_SOLUTION_SCREEN, NICKNAME_SCREEN, REGISTER_COMPLETE_SCREEN, PERSONAL_INFO_SCREEN,TERM_OF_USE_SCREEN,WIFI_MAIN_SCREEN, WIFI_GUIDE_SCREEN, CLARO_SIGNUP_SCREEN,NAVER_SIGNUP_SCREEN, FILTER_SCREEN, SIGNUP_SCREEN, LOGIN_SCREEN, CHOICE_DEVICE_SCREEN, REMOTE_DETAIL_SCREEN, SERIAL_NUMBER_SCREEN, BARCODE_SCAN_SCREEN,ACCEPT_SIGNUP_SCREEN,REMOTE_SCREEN,USER_PROFILE_SCREEN} from '../../../screens';
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
        let back = false;
        let screenObj;
        switch (link) {
          case USER_PROFILE_SCREEN.screen:
            screenObj = {...USER_PROFILE_SCREEN};
            break;
          case SERIAL_NUMBER_SCREEN.screen:
            screenObj = {...SERIAL_NUMBER_SCREEN};
            break;
          case WIFI_SET_UP_TEMP_SCREEN.screen:
            screenObj = {...WIFI_SET_UP_TEMP_SCREEN};
            break;
          case DEVICE_SELECT_SCREEN.screen:
            screenObj = {...DEVICE_SELECT_SCREEN};
            break;
          case DEVICE_ADD_SCREEN.screen:
            screenObj = {...DEVICE_ADD_SCREEN};
            break;
          case DEVICE_INFO_SCREEN.screen:
            screenObj = {...DEVICE_INFO_SCREEN};
            break;
          case WIFI_SOLUTION_SCREEN.screen:
            screenObj = {...WIFI_SOLUTION_SCREEN};
            break;
          case SERIAL_NUMBER_SOLUTION_SCREEN.screen:
            screenObj = {...SERIAL_NUMBER_SOLUTION_SCREEN};
            break;
          case REGISTER_COMPLETE_SCREEN.screen:
            screenObj = {...REGISTER_COMPLETE_SCREEN};
            break;
          case NICKNAME_SCREEN.screen:
            screenObj = {...NICKNAME_SCREEN};
            break;
          case WIFI_MAIN_SCREEN.screen:
            screenObj = {...WIFI_MAIN_SCREEN};
            break;
          case TIMER_SCREEN.screen:
            screenObj = {...TIMER_SCREEN};
            break;
          case TERM_OF_USE_SCREEN.screen:
            screenObj = {...TERM_OF_USE_SCREEN};
            break;
          case PERSONAL_INFO_SCREEN.screen:
            screenObj = {...PERSONAL_INFO_SCREEN};
            break;
          case WIFI_GUIDE_SCREEN.screen:
            screenObj = {...WIFI_GUIDE_SCREEN};
            break;
          case NAVER_SIGNUP_SCREEN.screen:
            screenObj = {...SERIAL_NUMBER_SCREEN};
            break;
          case CLARO_SIGNUP_SCREEN.screen:
            screenObj = {...CLARO_SIGNUP_SCREEN};
            break;
          case SIGNUP_SCREEN.screen:
            screenObj = {...SIGNUP_SCREEN};
            break;
          case LOGIN_SCREEN.screen:
            screenObj = {...LOGIN_SCREEN};
            break;
          case ACCEPT_SIGNUP_SCREEN.screen:
            screenObj = {...ACCEPT_SIGNUP_SCREEN};
            break;
          case CHOICE_DEVICE_SCREEN.screen:
            screenObj = {...CHOICE_DEVICE_SCREEN};
            break;
          case REMOTE_DETAIL_SCREEN.screen:
            screenObj = {...REMOTE_DETAIL_SCREEN};
            break;
          case WIFI_SET_UP_SCREEN.screen:
            screenObj = {...WIFI_SET_UP_SCREEN};
            break;
          case BARCODE_SCAN_SCREEN.screen:
            screenObj = {...BARCODE_SCAN_SCREEN};
            break;
          case REMOTE_SCREEN.screen:
            screenObj = {...REMOTE_SCREEN};
            break;
          case FILTER_SCREEN.screen:
            screenObj = {...FILTER_SCREEN};
            break;
          case 'back':
            this.props.navigator.pop();
            back = true;
            break;
        }
        !back && this.props.navigator.resetTo(screenObj);
      } else if (event.type === 'NavBarButtonPress') {
        console.log("Button is pressed",event.id);
        if (event.id === 'toggleDrawer') {
          this.props.navigator.toggleDrawer({
            animated: true,
            side: 'left',
          });
        }
        else if(event.id === 'goBack')
        {
          this.props.navigator.pop();
        }
        if(event.id === 'gotoHome') {
          console.log("gotoHOME");
          const screenObj = {...REMOTE_SCREEN};
          this.props.navigator.resetTo(screenObj)
        }
      }
    }
  }

  const hoisted = hoistStatics(WrappingComponent, WrappedComponent);
  hoisted.displayName = `NavigationWrapper(${getDisplayName(WrappedComponent)})`;
  return hoisted;
}
