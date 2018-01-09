import Toast from 'react-native-root-toast';

export default toast = (message, type, options) => {
  switch(type){
    case 'error':
      Toast.show(message, {
        shadow: true,
        animation: false,
        hideOnPress: true,
        delay: 0,
        backgroundColor: 'red',
        ...(options ? options : {}),
      });
  }
};