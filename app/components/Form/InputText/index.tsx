import type {ChangeEvent} from 'react';
import {forwardRef, useCallback, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {twJoin, twMerge} from 'tailwind-merge';
import Field from '../Field';
import type {InputProps} from '../types';

const InputText = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      className,
      classNameDescription,
      classNameIcon,
      classNameInput,
      classNameLabel,
      description,
      disabled,
      error,
      extra,
      hideMaxLength,
      icon,
      iconPosition = 'left',
      id,
      label,
      maxLength,
      name,
      onChange,
      readOnly,
      required,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const [length, setLength] = useState(0);

    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        if (maxLength) {
          setLength(event.currentTarget.value.length);
        }
        onChange?.(event);
      },
      [maxLength, onChange]
    );

    return (
      <Field
        aria-label={props['aria-label'] ?? name}
        className={className}
        classNameDescription={classNameDescription}
        classNameLabel={classNameLabel}
        description={description}
        disabled={disabled || readOnly}
        error={error}
        extra={extra}
        hideMaxLength={hideMaxLength}
        id={id ?? name}
        label={label}
        length={length}
        maxLength={maxLength}
        name={name}
        required={required}
        type="input"
      >
        <div className={twJoin((icon || children) && 'relative')}>
          <input
            ref={ref}
            aria-label={
              (props['aria-label'] ?? label === null) ? undefined
              : typeof label === 'string' ?
                label
              : name
            }
            className={twJoin(
              'w-full',
              icon && (iconPosition === 'left' ? 'pl-[2.3rem]' : 'pr-[2.3rem]'),
              error && 'input-invalid',
              classNameInput
            )}
            disabled={disabled}
            id={id ?? name}
            maxLength={maxLength}
            name={name}
            onChange={handleChange}
            readOnly={readOnly}
            required={required}
            tabIndex={readOnly ? -1 : undefined}
            type={type}
            {...props}
          />
          {icon && (
            <FontAwesomeIcon
              className={twMerge(
                'absolute top-[0.825rem] text-grey-400 dark:text-grey-600',
                iconPosition === 'left' ? 'left-3' : 'right-3',
                classNameIcon
              )}
              fixedWidth={true}
              icon={icon}
            />
          )}
        </div>
      </Field>
    );
  }
);

InputText.displayName = 'InputText';

export default InputText;
