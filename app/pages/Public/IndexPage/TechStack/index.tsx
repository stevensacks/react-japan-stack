import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import TechStackGroup from '~/pages/Public/IndexPage/TechStack/TechStackGroup';
import CodeQuality from './CodeQuality';
import Foundation from './Foundation';
import TestSuite from './TestSuite';

const TechStack: FC = () => {
  const {t} = useTranslation('pages', {keyPrefix: 'index.techStack'});

  return (
    <div className="flex flex-col items-center gap-4">
      <TechStackGroup name={t('foundation')}>
        <Foundation />
      </TechStackGroup>
      <TechStackGroup name={t('testSuite')}>
        <TestSuite />
      </TechStackGroup>
      <TechStackGroup name={t('codeQuality')}>
        <CodeQuality />
      </TechStackGroup>
    </div>
  );
};

export default TechStack;
