import {createCookieSessionStorage} from '@remix-run/node';
import {env} from '~/env.server';
import type {Theme} from '~/state/theme';
import {isSupportedTheme} from '~/state/theme';

// Based on Matt Stobbs' blog post:
// https://www.mattstobbs.com/remix-dark-mode/

const themeStorage = createCookieSessionStorage({
  cookie: {
    httpOnly: true,
    maxAge: 31_536_000,
    name: 'theme',
    path: '/',
    sameSite: 'lax',
    secrets: [env.SESSION_SECRET],
    // You cannot set true in Safari unless you're in production
    secure: env.NODE_ENV === 'production',
  },
});

export const getThemeSession = async (request: Request) => {
  const session = await themeStorage.getSession(request.headers.get('cookie'));

  return {
    commit: () => themeStorage.commitSession(session),
    getTheme: () => {
      const themeValue = session.get('theme');

      return isSupportedTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
  };
};
