import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './en.json';
import sv from './sv.json';
import es from './es.json';

const resources = {
  en: {translation: en},
  sv: {translation: sv},
  es: {translation: es},
};

export const supportedLngs = Object.keys(resources);

export function initI18n() {
  const locales = RNLocalize.getLocales();
  const deviceLng = locales && locales.length > 0 ? locales[0].languageCode : 'en';
  const lng = supportedLngs.includes(deviceLng) ? deviceLng : 'en';

  if (!i18n.isInitialized) {
    i18n
      .use(initReactI18next)
      .init({
        compatibilityJSON: 'v3',
        resources,
        lng,
        fallbackLng: 'en',
        interpolation: {escapeValue: false},
      })
      .catch(() => {});
  }
  return i18n;
}

export default i18n;

