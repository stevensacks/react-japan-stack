import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {faCircleUser, faCloudArrowUp} from '@fortawesome/free-solid-svg-icons';
import CrossHatch from '~/components/CrossHatch';
import LinkButton from '~/components/LinkButton';
import GaiaLogo from '~/components/Logos/GaiaLogo';
import CodeQuality from './CodeQuality';
import Foundation from './Foundation';
import TestSuite from './TestSuite';

const IndexPage: FC = () => {
  const {t} = useTranslation('pages', {keyPrefix: 'index'});

  return (
    <section className="relative flex h-full items-center justify-center p-4">
      <CrossHatch className="absolute inset-0" />
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center">
          <GaiaLogo height={125} />
          <h1 className="inline-block text-pretty text-center text-xl font-bold uppercase tracking-wider text-[#797979]">
            {t('title')}
          </h1>
        </div>
        <div className="flex flex-col items-center gap-6">
          <Foundation />
          <TestSuite />
          <CodeQuality />
        </div>
        <div className="mt-8 flex items-center justify-center gap-8">
          <LinkButton
            className="inline-block"
            icon={faCloudArrowUp}
            size="sm"
            to="/things"
            variant="tertiary"
          >
            {t('serviceExample')}
          </LinkButton>
          <LinkButton
            className="inline-block"
            icon={faCircleUser}
            size="sm"
            to="/login"
            variant="tertiary"
          >
            {t('authExample')}
          </LinkButton>
        </div>
      </div>
    </section>
  );
};

export default IndexPage;
