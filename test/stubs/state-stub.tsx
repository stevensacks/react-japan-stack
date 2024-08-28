/* eslint-disable react/display-name */
import type {ReactRenderer} from '@storybook/react';
import type {PartialStoryFn} from '@storybook/types';
import State from '~/state';
import type {Maybe, Thing} from '~/types';

type StateDecoratorProps = {
  thing?: Maybe<Thing>;
};

const decorator =
  (props?: StateDecoratorProps) => (Story: PartialStoryFn<ReactRenderer>) => (
    <State thing={props?.thing}>
      <Story />
    </State>
  );

export default decorator;
