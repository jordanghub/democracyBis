import React from 'react';
import { Field } from 'react-final-form';
import {
  InputLabel,
  Select,
  MenuItem,
  Input,
  Chip,
  FormHelperText,
} from '@material-ui/core';

import * as Styled from './SelectMultiple.style';
import { SelectMultipleProps } from './interface';

export const SelectMultipleChips = ({
  name,
  label,
  selectValues,
}: SelectMultipleProps) => (
  <Field name={name}>
    {({ input, meta }) => (
      <Styled.Wrapper>
        <InputLabel id={`${name}-label`}>{label}</InputLabel>
        <Select
          autoFocus={false}
          MenuProps={{
            variant: 'menu',
          }}
          error={meta.touched && meta.error}
          fullWidth
          id={name}
          labelId={`${name}-label`}
          multiple
          value={Array.from(input.value)}
          onChange={input.onChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div>
              {(selected as string[]).map((value) => {
                const selected = selectValues.find((item) => item.id === value);
                return <Chip key={selected.id} label={selected.name} />;
              })}
            </div>
          )}
        >
          {selectValues?.map(({ name, id }) => (
            <MenuItem key={name} value={id}>
              {name}
            </MenuItem>
          ))}
        </Select>
        {meta.touched && meta.error && (
          <FormHelperText error>{meta.error}</FormHelperText>
        )}
      </Styled.Wrapper>
    )}
  </Field>
);
