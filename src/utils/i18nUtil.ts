/**
 * Copyright (c) 2018-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {createInstance} from 'i18next';
import {initReactI18next} from 'react-i18next';

export const i18n = (resources) => {
  const i18next = createInstance();
  i18next
    .use(initReactI18next)
    .init({
      fallbackNS: 'translation',
      interpolation: {
        escapeValue: false,
        format(value, format) {
          if(format === 'array') {
            if(value?.length > 1) {
              const last = ` and ${value.pop()}`;
              return value.join(',  ') + last;
            }
          }
          return value;
        }
      },
      lng: 'en',
      react: {
        transKeepBasicHtmlNodesFor: ['br', 'h1', 'h2', 'h3', 'i', 'li', 'p', 'strong', 'u', 'ul'],
        transSupportBasicHtmlNodes: true
      },
      resources,
      returnObjects: true
    });

  return i18next;
};

