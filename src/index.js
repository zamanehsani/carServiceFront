import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import routes from './components/routes'
import { Provider } from 'react-redux';
import {store} from './components/redux/store';

import global_en from './translations/en/global.json';
import global_fr from './translations/fr/global.json';
import global_ar from './translations/ar/global.json';

import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation: { escapeValue: false },
  lng: localStorage.getItem('lng') || "en",
  resources:{
    en: { global: global_en },
    fr: { global: global_fr },
    ar: { global: global_ar }
  }
})
// Determine language direction
const langDirection = (language) => {
  // List of RTL languages
  const rtlLanguages = ["ar","fr"]; // Add more RTL languages if needed

  return rtlLanguages.includes(language) ? "rtl" : "ltr";
};

// Get current language and set direction
const currentLanguage = i18next.language;
const direction = langDirection(currentLanguage);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <div dir={direction}>
        <Provider store={store}>
          <RouterProvider router={routes} />
        </Provider>
      </div>
    </I18nextProvider>
  </React.StrictMode>
);