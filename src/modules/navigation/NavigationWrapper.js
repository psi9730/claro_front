import React, {Component} from 'react';
import hoistStatics from 'hoist-non-react-statics';
import autoBind from 'react-autobind';

import {LOGIN_SCREEN, PAST_RENTALS_SCREEN, PROFILE_SCREEN, RENTALS_SCREEN} from '../../../screens';

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
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }

    onNavigatorEvent(event) {
      if (event.type === 'DeepLink') {
        const link = event.link;
        let screenObj;
        switch (link) {
          case PROFILE_SCREEN.screen:
            screenObj = {...PROFILE_SCREEN};
            break;
          case RENTALS_SCREEN.screen:
            screenObj = {...RENTALS_SCREEN};
            break;
          case PAST_RENTALS_SCREEN.screen:
            screenObj = {...PAST_RENTALS_SCREEN};
            break;
          case LOGIN_SCREEN.screen:
            screenObj = {...LOGIN_SCREEN};
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
