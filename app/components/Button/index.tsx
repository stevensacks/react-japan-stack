/* eslint-disable react/button-has-type */
import type {ButtonHTMLAttributes, ReactNode} from 'react';
import {forwardRef} from 'react';
import type {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twJoin, twMerge} from 'tailwind-merge';
import Spinner from '~/components/Loaders/Spinner';
import type {Size} from '~/types';

export const SIZES: Record<Size, string> = {
  base: 'px-3 py-2 text-base',
  lg: 'px-4 py-2 text-lg',
  sm: 'px-3 py-1.5 text-sm',
  xl: 'px-4 py-2.5 text-xl',
  xs: 'px-1.5 py-1 text-xs',
};

export const ICON_SIZES: Record<Size, string> = {
  base: 'px-2.5',
  lg: 'px-2.5',
  sm: 'px-2',
  xl: 'px-2.5',
  xs: 'px-1.5',
};

export const ICON_POSITION: Record<'left' | 'right', string> = {
  left: '',
  right: 'flex-row-reverse',
};

export type Variant =
  | 'borderless'
  | 'custom'
  | 'destructive'
  | 'primary'
  | 'secondary'
  | 'tertiary';

export const VARIANTS: Record<Variant, string> = {
  borderless:
    'bg-transparent hover:bg-grey-400/10 disabled:hover:bg-transparent dark:hover:bg-grey-500/10 dark:disabled:hover:bg-transparent',
  custom: '',
  destructive:
    'border border-red-400 bg-red-500 text-white hover:bg-red-600 disabled:hover:bg-red-500 dark:border-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:disabled:hover:bg-red-600',
  primary:
    'border border-blue-400 bg-blue-500 text-white hover:bg-blue-600 disabled:hover:bg-blue-500 dark:border-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:disabled:hover:bg-blue-600',
  secondary:
    'border border-blue-500 bg-white text-blue-500 hover:bg-blue-50 disabled:hover:bg-white dark:border-blue-500 dark:bg-grey-900 dark:text-blue-100 dark:hover:bg-blue-900/15 dark:disabled:hover:bg-grey-900',
  tertiary:
    'border border-grey-400 bg-grey-500 text-white hover:bg-grey-600 disabled:hover:bg-grey-500 dark:border-grey-500 dark:bg-grey-600 dark:hover:bg-grey-700 dark:disabled:hover:bg-grey-600',
};

type MaybeIcon = {
  children: ReactNode;
  classNameIcon?: string;
  icon?: IconProp;
  iconPosition?: 'left' | 'right';
};

type OnlyIcon = {
  children?: never;
  classNameIcon?: string;
  icon: IconProp;
  iconPosition?: never;
};

export type IconUnion = MaybeIcon | OnlyIcon;

export type ButtonProps = {
  isLoading?: boolean;
  size?: Size;
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  IconUnion;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      classNameIcon,
      disabled,
      icon,
      iconPosition = 'left',
      isLoading,
      size = 'base',
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref
  ) => {
    const iconComponent =
      icon ?
        <FontAwesomeIcon
          className={twJoin(children && 'flex-none', classNameIcon)}
          fixedWidth={true}
          icon={icon}
          size="1x"
        />
      : null;

    const innerClassName = twJoin(
      icon &&
        children &&
        `flex items-center justify-center gap-1.5 ${ICON_POSITION[iconPosition]}`
    );

    return (
      <button
        ref={ref}
        className={twMerge(
          'select-none whitespace-nowrap text-center',
          VARIANTS[variant],
          SIZES[size],
          icon && ICON_SIZES[size],
          variant !== 'custom' && 'rounded-md transition-colors duration-200',
          isLoading ? 'cursor-wait' : (
            'disabled:cursor-not-allowed disabled:opacity-50'
          ),
          className
        )}
        disabled={disabled ?? isLoading}
        type={type}
        {...props}
      >
        {isLoading ?
          <span className="relative block">
            <span className={twJoin('invisible', innerClassName)}>
              {iconComponent}
              {children}
            </span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Spinner size={size} />
            </span>
          </span>
        : <span className={innerClassName}>
            {iconComponent}
            {children}
          </span>
        }
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
