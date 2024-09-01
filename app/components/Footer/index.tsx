import type {FC} from 'react';
import {twMerge} from 'tailwind-merge';

type FooterProps = {
  className?: string;
};

const Footer: FC<FooterProps> = ({className}) => (
  <footer className={twMerge('bg-secondary w-full px-4 py-2', className)}>
    <div className="flex w-full items-center justify-between">
      <small>&copy;2024 Gaia React</small>
      <small>
        <a
          href="https://github.com/gaia-react/remix-stack?tab=GPL-3.0-1-ov-file"
          rel="noreferrer"
          target="_blank"
        >
          Released under GPL-3.0 license
        </a>
      </small>
    </div>
  </footer>
);

export default Footer;
