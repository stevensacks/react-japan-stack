import type {FC, ReactNode} from 'react';
import {Links, Meta, Scripts, ScrollRestoration} from '@remix-run/react';
import {ThemeHead} from '~/state/theme';

type DocumentProps = {
  children: ReactNode;
  className?: string;
  dir?: string;
  isSsrTheme?: boolean;
  lang: string;
  noIndex?: boolean;
  title?: string;
};

const Document: FC<DocumentProps> = ({
  children,
  className,
  dir,
  isSsrTheme = false,
  lang,
  noIndex,
  title,
}) => (
  <html className={className} dir={dir} lang={lang}>
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width,initial-scale=1" name="viewport" />
      <Meta />
      <Links />
      <link href="https://fonts.googleapis.com" rel="preconnect" />
      <link
        crossOrigin="anonymous"
        href="https://fonts.gstatic.com"
        rel="preconnect"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
        rel="stylesheet"
      />
      <ThemeHead isSsrTheme={isSsrTheme} />
      {noIndex && <meta content="noindex" name="robots" />}
      {title && <title>{title}</title>}
    </head>
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);

export default Document;
