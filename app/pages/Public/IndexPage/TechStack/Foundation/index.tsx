import type {FC} from 'react';
import {faFontAwesome} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import I18NextLogo from '~/components/Logos/I18NextLogo';
import RemixR from '~/components/Logos/RemixR';
import RVFLogo from '~/components/Logos/RVFLogo';
import TailwindLogo from '~/components/Logos/TailwindLogo';
import ZodLogo from '~/components/Logos/ZodLogo';

const Foundation: FC = () => (
  <>
    <a
      aria-label="Remix Run"
      className="plain-link text-white"
      href="https://remix.run"
      rel="noreferrer"
      target="_blank"
    >
      <RemixR height={32} />
    </a>
    <a
      aria-label="TailwindCSS"
      className="plain-link"
      href="https://tailwindcss.com"
      rel="noreferrer"
      target="_blank"
    >
      <TailwindLogo height={28} />
    </a>
    <a
      aria-label="Zod"
      className="plain-link"
      href="https://zod.dev/"
      rel="noreferrer"
      target="_blank"
    >
      <ZodLogo height={38} />
    </a>
    <a
      aria-label="RVF"
      className="plain-link"
      href="https://www.rvf-js.io/"
      rel="noreferrer"
      target="_blank"
    >
      <RVFLogo height={26} />
    </a>
    <a
      aria-label="React-i18next"
      className="plain-link"
      href="https://react.i18next.com/"
      rel="noreferrer"
      target="_blank"
    >
      <I18NextLogo height={32} />
    </a>
    <a
      aria-label="Font Awesome"
      className="plain-link text-3xl text-[#538DD7]"
      href="https://fontawesome.com"
      rel="noreferrer"
      target="_blank"
    >
      <FontAwesomeIcon fixedWidth={true} icon={faFontAwesome} />
    </a>
  </>
);

export default Foundation;
