import {Platform} from 'react-native';

const setNavStyle = (navigator, scheme, statusBarColor, navBarColor, navBarHidden, statusBarHidden,navBarTextColor='black',navBarButtonColor='black') => {
    if(Platform.OS==='android'){
      navigator.setStyle({
        statusBarTextColorScheme: scheme,
        statusBarTextColorSchemeSingleScreen: scheme,
        topBarElevationShadowEnabled: false,
        statusBarColor: statusBarColor,
        navBarBackgroundColor: navBarColor,
        navBarHidden: navBarHidden,
        drawUnderNavBar: navBarHidden,
        drawUnderStatusBar: statusBarHidden,
        statusBarHidden: statusBarHidden
      });}
    else {
      navigator.setStyle({
        statusBarTextColorScheme: scheme,
        navBarButtonColor: navBarButtonColor,
        navBarTextColor: navBarTextColor,
        navBarNoBorder: true,
        statusBarColor: statusBarColor,
        navBarBackgroundColor: navBarColor,
        navBarHidden: navBarHidden,
        drawUnderNavBar: navBarHidden,
        drawUnderStatusBar: statusBarHidden,
        statusBarHidden: statusBarHidden
      });
    }
};

export default setNavStyle;