import type {FC} from 'react';
import {twMerge} from 'tailwind-merge';

type VersionProps = {
  className?: string;
};

const Version: FC<VersionProps> = ({className}) => (
  <span className={twMerge('text-sm', className)}>
    <span>{process.env.npm_package_version}</span>
    {process.env.COMMIT_HASH && <span> - {process.env.COMMIT_HASH}</span>}
  </span>
);

export default Version;
