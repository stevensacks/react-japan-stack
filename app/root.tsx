import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {config} from '@fortawesome/fontawesome-svg-core';
import {cssBundleHref} from '@remix-run/css-bundle';
import type {LinksFunction, LoaderFunctionArgs} from '@remix-run/node';
import {json} from '@remix-run/node';
import {Outlet, useLoaderData} from '@remix-run/react';
import {useChangeLanguage} from 'remix-i18next/react';
import {twJoin} from 'tailwind-merge';
import Document from '~/components/Document';
import i18next from '~/i18next.server';
import {getLanguageSession} from '~/sessions.server/language';
import {getThemeSession} from '~/sessions.server/theme';
import State from '~/state';
import {useTheme} from '~/state/theme';
import tailwind from '~/styles/tailwind.css?url';
import type {Thing} from '~/types';
import {isProductionHost} from '~/utils/http.server';
import ErrorBoundary from './components/ErrorBoundary';
import {envClient} from './env.server';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export const loader = async ({request}: LoaderFunctionArgs) => {
  const isProduction = isProductionHost(request);

  const languageSession = await getLanguageSession(request);

  const language = languageSession.get() || (await i18next.getLocale(request));

  const themeSession = await getThemeSession(request);

  const headers = new Headers();
  headers.set('Vary', 'Cookie');

  const thing: Thing = {id: '1', name: 'Thing'};

  return json(
    {
      ENV: envClient,
      language,
      noIndex: !isProduction,
      theme: themeSession.getTheme(),
      thing,
    },
    {headers}
  );
};

export const links: LinksFunction = () => [
  {href: tailwind, rel: 'stylesheet'},
  ...(cssBundleHref ? [{href: cssBundleHref, rel: 'stylesheet'}] : []),
];

const App: FC = () => {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  const {i18n} = useTranslation();

  const {ENV, language, noIndex} = data;

  useChangeLanguage(language);

  return (
    <Document
      className={twJoin(theme)}
      dir={i18n.dir()}
      isSsrTheme={Boolean(data.theme)}
      lang={language}
      noIndex={noIndex}
    >
      <Outlet />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.process = ${JSON.stringify({
            env: ENV,
          })}`,
        }}
      />
    </Document>
  );
};

const AppWithState = () => {
  const data = useLoaderData<typeof loader>();

  return (
    <State theme={data.theme} thing={data.thing}>
      <App />
    </State>
  );
};

export {ErrorBoundary};

export default AppWithState;
