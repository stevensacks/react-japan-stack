import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import ThingCard from '~/components/ThingCard';
import type {Thing} from '~/services/api/things/types';

type ThingPageProps = {
  className?: string;
  thing: Thing;
};

const ThingPage: FC<ThingPageProps> = ({className, thing}) => (
  <section className={twJoin('container py-12', className)}>
    <ThingCard thing={thing} />
  </section>
);

export default ThingPage;
