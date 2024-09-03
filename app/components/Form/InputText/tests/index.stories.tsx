import type {Meta, StoryFn} from '@storybook/react';
import InputText from '../index';

const meta: Meta = {
  component: InputText,
  parameters: {
    controls: {hideNoControlsWarning: true},
  },
  title: 'Form/Input/Text',
};

export default meta;

export const Default: StoryFn = () => (
  <form className="max-w-md space-y-4 p-4">
    <InputText label="Text Input" name="text" placeholder="Placeholder" />
    <InputText
      label="Text Input Max Length"
      maxLength={50}
      name="textMax"
      placeholder="Placeholder"
    />
    <InputText
      label="Text Input Required"
      name="textRequired"
      placeholder="Placeholder"
      required={true}
    />
    <InputText
      error="This field is required"
      label="Text Input Required Invalidated"
      name="textInvalid"
      placeholder="Placeholder"
      required={true}
    />
    <InputText
      disabled={true}
      label="Disabled"
      name="textDisabled"
      placeholder="Disabled"
    />
  </form>
);
