import {Fragment} from 'react';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import type {Meta, StoryFn} from '@storybook/react';
import {twJoin} from 'tailwind-merge';
import type {Size} from '~/types';
import type {Variant} from '../index';
import Button from '../index';

const meta: Meta = {
  component: Button,
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  title: 'Components/Button',
};

export default meta;

const sizes: Size[] = ['xs', 'sm', 'base', 'lg', 'xl'];

const variants: Variant[] = [
  'primary',
  'secondary',
  'tertiary',
  'destructive',
  'borderless',
];

const legends = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'];

const render = (
  disabled?: boolean,
  icon?: boolean,
  iconText?: boolean,
  isLoading?: boolean
) => (
  <div className="w-fit p-4">
    <div className="grid max-w-5xl grid-cols-11 items-center justify-items-start gap-x-8 gap-y-4">
      <div />
      {variants.map((variant) => (
        <legend key={variant} className="col-span-2 text-sm capitalize">
          {variant}
        </legend>
      ))}
      {sizes.map((size) => (
        <Fragment key={size}>
          <legend
            className={twJoin(
              legends.find((value) => value.includes(size)),
              disabled && 'text-disabled'
            )}
          >
            {size}
          </legend>
          {variants.map((variant) => (
            <Button
              key={variant}
              className="col-span-2 capitalize"
              disabled={disabled}
              icon={icon ? faStar : undefined}
              isLoading={isLoading}
              size={size}
              variant={variant}
            >
              {!icon || iconText ? 'Label' : undefined}
            </Button>
          ))}
        </Fragment>
      ))}
    </div>
  </div>
);

export const Default: StoryFn = () => render();

export const Loading: StoryFn = () => render(false, false, false, true);
Loading.parameters = {
  chromatic: {disableSnapshot: true},
};

export const Disabled: StoryFn = () => render(true);

export const Icon: StoryFn = () => render(false, true);

export const IconDisabled: StoryFn = () => render(true, true);

export const IconText: StoryFn = () => render(false, true, true);

export const IconTextDisabled: StoryFn = () => render(true, true, true);
