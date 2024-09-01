import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {twMerge} from 'tailwind-merge';

type CreateThingPageProps = {
  className?: string;
};

const CreateThingPage: FC<CreateThingPageProps> = ({className}) => {
  const {t} = useTranslation('pages', {keyPrefix: 'things'});

  return (
    <div className={twMerge(className)}>
      <h1>{t('create')}</h1>
    </div>
  );
};

export default CreateThingPage;
