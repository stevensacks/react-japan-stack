import type {FC} from 'react';
import {twJoin} from 'tailwind-merge';
import ThingsGrid from '~/pages/Public/Things/AllThingsPage/ThingsGrid';

type AllThingsPageProps = {
  className?: string;
};

const AllThingsPage: FC<AllThingsPageProps> = ({className}) => (
  <section className={twJoin('container space-y-8 py-12', className)}>
    <ThingsGrid />
  </section>
);

export default AllThingsPage;
