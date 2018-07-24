import _ from 'lodash';
import i18next from 'i18next'
import i18nextReactNative from 'i18next-react-native-language-detector'

import ko from './ko';
import en from './en';

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

export const customI18nextReactNative = () => {
  return {
    ...i18nextReactNative,
    detect: () => {
      return 'ko';
      const phoneLocale = i18nextReactNative.detect();
      if (phoneLocale.match(/^en(.)*/)) {
        return 'en';
      } else if (phoneLocale.match(/ko(.)*/)) {
        return 'ko';
      } else if (phoneLocale.match(/ja(.)*/)) {
        return 'ja';
      } else if (phoneLocale === 'zh-TW') {
        return 'zh_hant';
      } else if (phoneLocale.match(/zh(.)*/)) {
        return 'zh_hans';
      } else {
        return 'ko';
      }
    }
  }
};

export const deviceLocale = customI18nextReactNative().detect();

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  _.merge(options, {debug: true});
}

switch (whichBackend()) {
  case 'memory':
  default:
    options.resources = {
      ko,
      en,
      // ja,
      // zh_hans: zhHans,
      // zh_hant: zhHant,
    };
}

i18next
  .use(customI18nextReactNative())
  .init(options);

export default i18next;

export const preferredLocale = (item, fieldName) => item[`${fieldName}${_.upperFirst('ko')}`] || item[fieldName];
