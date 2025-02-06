/**
 * Copyright (c) 2025-Present, Nitrogen Labs, Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
import {get} from '@nlabs/rip-hunter';

export const fetchJsonFromUrl = async <T = any>(url: string): Promise<T> => {
  try {
    const response = await get(url);
    return response.data as T;
  } catch (error) {
    throw new Error(`Failed to fetch JSON from ${url}: ${error.message}`);
  }
};

export const parseTemplate = (
  markdown: string = '',
  values: Record<string, any> = {}
): string => {
  return markdown.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = values[key];
    return value !== undefined ? String(value) : match;
  });
};
