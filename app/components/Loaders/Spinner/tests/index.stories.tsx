import type {Meta, StoryFn} from '@storybook/react';
import type {SpinnerProps} from '../index';
import Spinner from '../index';

const meta: Meta = {
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      name: 'Size',
      options: ['xs', 'sm', 'base', 'lg', 'xl'],
    },
  },
  component: Spinner,
  parameters: {
    chromatic: {disableSnapshot: true},
  },
  title: 'Components/Loaders/Spinner',
};

export default meta;

const Template: StoryFn<SpinnerProps> = (args) => (
  <div className="p-4">
    <Spinner {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  size: 'base',
};
