import type {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {faPencil, faTrash} from '@fortawesome/free-solid-svg-icons';
import {twMerge} from 'tailwind-merge';
import Button from '~/components/Button';
import LinkButton from '~/components/LinkButton';
import type {Thing} from '~/services/api/things/types';

type ThingCardProps = {
  className?: string;
  thing: Thing;
};

const ThingCard: FC<ThingCardProps> = ({className, thing}) => {
  const {t} = useTranslation('pages', {keyPrefix: 'things'});

  return (
    <div
      className={twMerge(
        'bg-secondary flex items-center justify-between rounded-md border border-grey-500 p-4',
        className
      )}
    >
      <div>
        <div className="text-2xl text-blue-600 dark:text-blue-500">
          {thing.name}
        </div>
        <div>{thing.description}</div>
      </div>
      <div className="space-x-4">
        <LinkButton
          className="inline-block"
          icon={faPencil}
          size="sm"
          to={`/things/${thing.id}`}
        >
          {t('edit')}
        </LinkButton>
        <Button icon={faTrash} size="sm" variant="destructive">
          {t('delete')}
        </Button>
      </div>
    </div>
  );
};

export default ThingCard;
