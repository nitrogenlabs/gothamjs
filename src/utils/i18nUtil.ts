/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {t} from 'i18next';

export const i18n = (
  key: string | string[],
  defaultValue?: string,
  options?: Record<string, unknown>,
  locale?: string
): string => t(key, options);
