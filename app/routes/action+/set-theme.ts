import type {ActionFunction} from '@remix-run/node';
import {json, redirect} from '@remix-run/node';
import {getThemeSession} from '~/sessions.server/theme';
import {isSupportedTheme} from '~/state/theme';

export const action: ActionFunction = async ({request}) => {
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (!isSupportedTheme(theme)) {
    return json(
      {
        message: `theme value of ${theme} is not a valid theme`,
        ok: false,
      },
      {status: 400}
    );
  }

  themeSession.setTheme(theme);

  return json(
    {ok: true},
    {headers: {'Set-Cookie': await themeSession.commit()}}
  );
};

export const loader = async () => redirect('/', {status: 404});
