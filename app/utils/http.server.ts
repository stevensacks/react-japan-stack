import type {HeadersFunction} from '@remix-run/node';

export const isProductionHost = (request: Request) =>
  request.headers.get('host') === 'react-japan.dev';

export const headers: HeadersFunction = ({loaderHeaders}) => loaderHeaders;
