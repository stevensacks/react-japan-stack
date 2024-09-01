import type {HeadersFunction} from '@remix-run/node';

export const isProductionHost = (request: Request) =>
  request.headers.get('host') === 'domain.tld';

// based on Jacob Paris' blog post:
// https://www.jacobparis.com/content/remix-headers

const SETTABLE_HEADERS = ['Cache-Control', 'Vary', 'Server-Timing'];

export const headers: HeadersFunction = ({loaderHeaders}) => {
  const safeHeaders = new Headers();

  SETTABLE_HEADERS.forEach((header) => {
    if (loaderHeaders.has(header)) {
      safeHeaders.set(header, loaderHeaders.get(header)!);
    }
  });

  return safeHeaders;
};
