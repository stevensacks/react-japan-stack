import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import ThingCard from '~/components/ThingCard';
import {useThings} from '~/services/api/things/state';

const ThingsGrid: FC = () => {
  const {t} = useTranslation('pages', {keyPrefix: 'things'});

  const things = useThings();

  return things?.length ?
      <div className="grid grid-cols-2 gap-8">
        {things.map((thing) => (
          <ThingCard key={thing.id} thing={thing} />
        ))}
      </div>
    : <div className="text-grey-500">{t('none')}</div>;
};

export default ThingsGrid;
