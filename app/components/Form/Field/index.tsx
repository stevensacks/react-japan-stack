import type {FC, ReactNode} from 'react';
import FieldLabel from './FieldLabel';
import FieldStatus from './FieldStatus';

type WithMaxLength = {
  maxLength?: number;
  name: string;
  type: 'input' | 'password' | 'textarea';
};

type WithLabel = {
  maxLength?: never;
  name: string;
  type: 'radio' | 'select';
};

type WithoutLabel = {
  maxLength?: never;
  name?: never;
  type: 'button' | 'checkbox' | 'radio';
};

type WithValue = {
  maxLength?: never;
  name?: never;
  type: 'value';
};

type FieldProps = {
  children: ReactNode;
  className?: string;
  classNameDescription?: string;
  classNameLabel?: string;
  description?: ReactNode;
  disabled?: boolean;
  error?: ReactNode;
  extra?: ReactNode;
  hideMaxLength?: boolean;
  id?: string;
  label?: ReactNode;
  length?: number;
  required?: boolean;
} & (WithLabel | WithMaxLength | WithoutLabel | WithValue);

const Field: FC<FieldProps> = ({
  children,
  className,
  classNameDescription,
  classNameLabel,
  description,
  disabled,
  error,
  extra,
  hideMaxLength,
  id,
  label,
  length,
  maxLength,
  name,
  required,
}) => {
  const status =
    description || error || maxLength ?
      <FieldStatus
        className={classNameDescription}
        description={description}
        disabled={disabled}
        error={error}
        hideMaxLength={hideMaxLength}
        id={id ?? name}
        length={length}
        maxLength={maxLength}
      />
    : null;

  const fieldLabel =
    label ?
      <FieldLabel
        className={classNameLabel}
        disabled={disabled}
        error={error}
        extra={extra}
        htmlFor={name}
        required={required}
      >
        {label}
      </FieldLabel>
    : null;

  return (
    <div className={className} role="presentation">
      {fieldLabel}
      {children}
      {status}
    </div>
  );
};

export default Field;
