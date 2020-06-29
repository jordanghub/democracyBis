import React from 'react';
import { TextProps } from './interface';
import { Field } from 'react-final-form';
import * as Styled from './Text.style';

export const Text = ({
  name,
  label,
  multiline,
  rows,
  type,
  disabled = false,
  hidden = false,
}: TextProps) => (
  <Field name={name}>
    {({ input, meta }) => (
      <Styled.Wrapper
        hidden={hidden}
        error={!!(meta.touched && meta.error)}
        helperText={meta.touched ? meta.error : ''}
        label={label}
        name={input.name}
        id={input.name}
        value={input.value}
        onChange={disabled ? null : input.onChange}
        onFocus={input.onFocus}
        onBlur={input.onBlur}
        fullWidth
        disabled={disabled}
        multiline={multiline}
        rows={rows || 0}
        type={type || 'text'}
      />
    )}
  </Field>
);
