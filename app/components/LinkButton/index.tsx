import type {AnchorHTMLAttributes, FC} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link, NavLink} from '@remix-run/react';
import {twJoin, twMerge} from 'tailwind-merge';
import type {IconUnion, Variant} from '~/components/Button';
import {ICON_POSITION, ICON_SIZES, SIZES, VARIANTS} from '~/components/Button';
import type {Size} from '~/types';

type LinkButtonProps = {
  disabled?: boolean;
  href?: never;
  isNav?: boolean;
  prefetch?: 'intent' | 'none' | 'render';
  size?: Size;
  to: string;
  variant?: Variant;
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  IconUnion;

const LinkButton: FC<LinkButtonProps> = ({
  children,
  className,
  classNameIcon,
  disabled,
  icon,
  iconPosition = 'left',
  isNav,
  prefetch,
  size = 'base',
  to = '',
  variant = 'primary',
  ...props
}) => {
  const iconComponent =
    icon ?
      <FontAwesomeIcon
        className={twJoin(children && 'flex-none', classNameIcon)}
        fixedWidth={true}
        icon={icon}
        size="1x"
      />
    : null;

  const innerSpan = (
    <span
      className={twJoin(
        icon &&
          children &&
          `flex items-center justify-center gap-1.5 ${ICON_POSITION[iconPosition]}`
      )}
    >
      {iconComponent}
      {children}
    </span>
  );

  const css = twMerge(
    'plain-link select-none whitespace-nowrap text-center',
    disabled ?
      VARIANTS[variant].split('disabled:').join('')
    : VARIANTS[variant],
    SIZES[size],
    icon && ICON_SIZES[size],
    variant !== 'custom' && 'rounded-md transition-colors duration-200',
    disabled && 'cursor-not-allowed opacity-50 dark:opacity-30',
    className
  );

  if (to.startsWith('http')) {
    return (
      <a
        className={css}
        data-disabled={disabled ? true : undefined}
        href={to}
        rel="noopener noreferrer"
        tabIndex={disabled ? -1 : undefined}
        target="_blank"
        {...props}
      >
        {innerSpan}
      </a>
    );
  }

  if (isNav) {
    return (
      <NavLink
        className={({isActive}) => twMerge(css, !isActive && VARIANTS.tertiary)}
        data-disabled={disabled ? true : undefined}
        prefetch={prefetch}
        tabIndex={disabled ? -1 : undefined}
        to={to}
        {...props}
      >
        {innerSpan}
      </NavLink>
    );
  }

  return (
    <Link
      className={css}
      data-disabled={disabled ? true : undefined}
      prefetch={prefetch}
      tabIndex={disabled ? -1 : undefined}
      to={to}
      {...props}
    >
      {innerSpan}
    </Link>
  );
};

export default LinkButton;
