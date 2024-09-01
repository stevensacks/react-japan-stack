import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from '@remix-run/react';

const IndexPage: FC = () => {
  const {t} = useTranslation('pages', {keyPrefix: 'index'});

  return (
    <section className="space-y-8 p-4">
      <h1 className="text-3xl font-bold">{t('meta.title')}</h1>
      <ul>
        <li>
          <Link to="/things">{t('viewThings')}</Link>
        </li>
      </ul>
    </section>
  );
};

export default IndexPage;
