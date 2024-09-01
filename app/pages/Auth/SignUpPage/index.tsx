import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {twMerge} from 'tailwind-merge';

type SignUpPageProps = {
  className?: string;
};

const SignUpPage: FC<SignUpPageProps> = ({className}) => {
  const {t} = useTranslation('auth');

  return (
    <div className={twMerge(className)}>
      <h1>{t('signup.title')}</h1>
    </div>
  );
};

export default SignUpPage;
