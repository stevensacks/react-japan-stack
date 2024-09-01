import type {LoaderFunctionArgs, MetaFunction} from '@remix-run/node';
import {json} from '@remix-run/node';
import {useLoaderData} from '@remix-run/react';
import i18next from '~/i18next.server';
import AllThingsPage from '~/pages/Public/Things/AllThingsPage';
import {getThings} from '~/services/api/things/requests.server';
import {ThingsProvider} from '~/services/api/things/state';

export const loader = async ({request}: LoaderFunctionArgs) => {
  const t = await i18next.getFixedT(request, 'pages');
  const title = t('things.meta.title');
  const description = t('things.meta.description');

  const things = await getThings(request);

  return json({description, things, title});
};

export const meta: MetaFunction<typeof loader> = ({data}) => [
  {title: data?.title},
  {
    content: data?.description,
    name: 'description',
  },
];

const ThingsRoute = () => {
  const {things} = useLoaderData<typeof loader>();

  return (
    <ThingsProvider things={things}>
      <AllThingsPage />
    </ThingsProvider>
  );
};

export default ThingsRoute;
