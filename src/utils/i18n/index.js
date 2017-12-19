import _ from 'lodash';
import i18next from 'i18next'
import i18nextReactNative from 'i18next-react-native-language-detector'

import ko from './ko';

const whichBackend = () => 'memory';
const options = {
  fallbackLng: 'ko',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: '.',
  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
  },
  react: {
    wait: true,
  },
};

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  _.merge(options, {debug: true});
}

switch (whichBackend()) {
  case 'memory':
  default:
    options.resources = {
      ko,
      // en,
      // ja,
      // zh_hans: zhHans,
      // zh_hant: zhHant,
    };
}

i18next
  .use(i18nextReactNative)
  .init(options);

console.log('options', options);

export default i18next;
