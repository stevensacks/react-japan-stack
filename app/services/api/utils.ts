/* eslint-disable sonarjs/function-return-type,@typescript-eslint/no-explicit-any,max-lines */
import {isObject, snakeCase} from 'lodash';
import type {Language} from '~/languages';
import {getLanguageSession} from '~/sessions.server/language';
import {range} from '~/utils/array';
import {compactFormData} from '~/utils/dom';
import {compact, toSnakeCase} from '~/utils/object';

export const API_USES_SNAKE_CASE = true;

export const API_EXPECTS_TRAILING_SLASH = false;

export const cleanData = (data?: FormData | Record<string, unknown>) => {
  if (!data) {
    return undefined;
  }

  if (process.env.NODE_ENV === 'test') {
    const compacted = compact(
      data instanceof FormData ? Object.fromEntries(data.entries()) : data,
      {keepFalsy: true}
    );

    return JSON.stringify(
      API_USES_SNAKE_CASE ? toSnakeCase(compacted) : compacted
    );
  }

  if (data instanceof FormData) {
    return compactFormData(data);
  }

  const compacted = compact(data, {keepFalsy: true});

  return JSON.stringify(
    API_USES_SNAKE_CASE ? toSnakeCase(compacted) : compacted
  );
};

const toFormData = (jsonData: Record<string, any>) => {
  const formData = new FormData();

  Object.entries(jsonData).forEach(([key, value]) => {
    const casedKey = API_USES_SNAKE_CASE ? snakeCase(key) : key;

    if (isObject(value)) {
      if (value instanceof FileList) {
        // add all files from FileList
        range(0, value.length - 1).forEach((index) => {
          formData.append(casedKey, value[index]);
        });
      } else {
        // Other
        Object.keys(value).forEach((item) => {
          formData.append(casedKey, item);
        });
      }
    } else {
      formData.append(casedKey, value);
    }
  });

  return formData;
};

// For testing inside Vitest
const toParams = (formData: FormData | Record<string, unknown>) => {
  const params = new URLSearchParams();
  const data =
    formData instanceof FormData ?
      Object.fromEntries(formData.entries())
    : formData;
  Object.entries(data).forEach(([key, value]: [string, any]) => {
    if (value instanceof FileList) {
      const files: string[] = [];
      range(0, value.length - 1).forEach((index) => {
        files.push(value[index].name);
      });
      params.append(key, files.join(','));
    } else if (typeof value === 'string') {
      params.append(key, value);
    } else if (Array.isArray(value)) {
      params.append(key, value.join(','));
    } else {
      // Other objects
      params.append(key, Object.keys(value).join(','));
    }
  });

  return params.toString();
};

export const encodeData = (data?: FormData | Record<string, unknown>) => {
  if (!data) {
    return undefined;
  }

  if (process.env.NODE_ENV === 'test') {
    return toParams(data);
  }

  if (data instanceof FormData) {
    if (!API_USES_SNAKE_CASE) {
      return data;
    }

    const snakeCased = new FormData();

    // eslint-disable-next-line no-restricted-syntax
    for (const pair of data.entries()) {
      const [key, value] = pair;

      snakeCased.append(snakeCase(key), value);
    }

    return snakeCased;
  }

  return toFormData(data);
};

export const getSafeParams = (params?: Record<string, unknown>) => {
  if (!params) {
    return '';
  }

  const urlSearchParams = new URLSearchParams();

  const compactedParams = compact(params);
  const casedParams =
    API_USES_SNAKE_CASE ? toSnakeCase<any>(params) : compactedParams;

  Object.entries(casedParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      const [head, ...tail] = value;

      if (urlSearchParams.has(key)) {
        tail.forEach((item) => {
          urlSearchParams.append(key, item);
        });
      } else {
        urlSearchParams.set(key, head);
      }
    } else {
      urlSearchParams.set(key, String(value));
    }
  });

  if (urlSearchParams.size === 0) {
    return '';
  }

  urlSearchParams.sort();

  return urlSearchParams.toString();
};

export const getSafeUrl = (url: string) => {
  const leadingSlash = url.startsWith('/') ? url : `/${url}`;

  if (url.includes('?')) {
    const [before, after] = leadingSlash.split('?');

    if (API_EXPECTS_TRAILING_SLASH) {
      const trailingSlash = before.endsWith('/') ? before : `${before}/`;

      return `${trailingSlash}?${after}`;
    }

    const noTrailingSlash = before.endsWith('/') ? before.slice(0, -1) : before;

    return `${noTrailingSlash}?${after}`;
  }

  if (API_EXPECTS_TRAILING_SLASH) {
    return url.endsWith('/') ? leadingSlash : `${leadingSlash}/`;
  }

  return url.endsWith('/') ? leadingSlash.slice(0, -1) : leadingSlash;
};

export const getAcceptLanguage = async ({
  language,
  request,
}: {
  language?: Language;
  request?: Request;
}): Promise<string> => {
  if (request) {
    const languageSession = await getLanguageSession(request);

    return (
      languageSession.get() ||
      request.headers.get('Accept-Language') ||
      language ||
      'en'
    );
  }

  return language ?? 'en';
};

export const getBaseUrl = () => {
  if (process.env.API_URL) {
    return process.env.API_URL;
  }

  if (typeof window !== 'undefined' && window.process.env.API_URL) {
    return window.process.env.API_URL;
  }

  // THIS SHOULD NEVER HAPPEN BECAUSE OF ZOD ENV PARSING (but just in case)
  throw new Error('API_URL not defined');
};
