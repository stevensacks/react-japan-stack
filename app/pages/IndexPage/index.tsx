import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import Header from '~/components/Header';

const IndexPage: FC = () => {
  const {t} = useTranslation('pages');

  return (
    <main>
      <Header />
      <section className="space-y-8 p-4">
        <h1 className="text-3xl font-bold">{t('index.meta.title')}</h1>
      </section>
    </main>
  );
};

export default IndexPage;
