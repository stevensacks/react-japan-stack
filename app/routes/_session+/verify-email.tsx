import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import VerifyEmailPage from 'app/pages/Session/Profile/VerifyEmailPage';
import i18next from '~/i18next.server';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('profile.verifyEmail.meta.title');

  return json({title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
];

const VerifyEmailRoute = () => <VerifyEmailPage />;

export default VerifyEmailRoute;
