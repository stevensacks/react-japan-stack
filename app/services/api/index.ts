/* eslint-disable @typescript-eslint/no-explicit-any */
import type {Language} from '~/languages';
import {toHeadersObject} from '~/utils/http';
import {compact, toCamelCase} from '~/utils/object';
import {
  API_USES_SNAKE_CASE,
  cleanData,
  encodeData,
  getAcceptLanguage,
  getBaseUrl,
  getSafeParams,
  getSafeUrl,
} from './utils';

export const Accept = {
  JSON: 'application/json',
  TEXT_HTML:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
} as const;

export const ContentType = {
  FORM_URLENCODED: 'application/x-www-form-urlencoded',
  JSON: 'application/json',
} as const;

type ApiOptions = {
  accept?: typeof Accept;
  contentType?: typeof ContentType;
  data?: FormData | Record<string, unknown>;
  headers?: Headers | Record<string, string>;
  language?: Language;
  method?: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT';
  params?: Record<string, unknown>;
  preserveCase?: boolean;
  request?: Request;
};

export const api = async (url: string, options?: ApiOptions): Promise<any> => {
  const {
    accept = Accept.JSON,
    contentType = ContentType.JSON,
    data,
    headers,
    language,
    method,
    params,
    preserveCase,
    request,
  } = options || {};

  const safeParams = getSafeParams(params);

  let body: FormData | string | undefined;

  if (contentType === ContentType.JSON) {
    body = cleanData(data);
  } else {
    body = encodeData(data);
  }

  const q = url.includes('?') ? '&' : '?';
  const search = safeParams ? `${q}${safeParams}` : '';

  const safeUrl =
    url.startsWith('http') ? url : `${getBaseUrl()}${getSafeUrl(url)}`;

  const cleanHeaders = compact({
    ...toHeadersObject(headers),
    Accept: accept,
    'Accept-Language': await getAcceptLanguage({language, request}),
    'Content-Type': contentType,
  });

  // We don't catch because it's better to handle errors in the caller
  return fetch(
    `${safeUrl}${search}`,
    compact({
      body,
      headers: cleanHeaders,
      method,
    })
  ).then(async (response) => {
    if (accept === Accept.JSON) {
      const originalCaseData = await response.json();

      if (preserveCase || !API_USES_SNAKE_CASE) {
        return originalCaseData.data;
      }

      return toCamelCase(originalCaseData.data);
    }

    return response;
  });
};
