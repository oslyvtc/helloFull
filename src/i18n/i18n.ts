import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from './en';
import { uk } from './uk';

i18n.use(initReactI18next).init({
  resources: {
    en,
    uk,
  },

  lng: 'en',

  fallbackLng: 'en',

  supportedLngs: ['en', 'uk'],

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
