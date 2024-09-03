import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ThingCard from '~/components/ThingCard';
import {useThings} from '~/services/api/things/state';

const ThingsGrid: FC = () => {
  const {t} = useTranslation('pages', {keyPrefix: 'things'});

  const things = useThings();

  return things?.length ?
      <div className="mx-auto grid max-w-screen-lg grid-cols-1 gap-8 px-4 md:grid-cols-2">
        {things.map((thing) => (
          <ThingCard key={thing.id} thing={thing} />
        ))}
      </div>
    : <div className="px-4">{t('none')}</div>;
};

export default ThingsGrid;
