import React from 'react';
import { Field } from 'react-final-form';
import { Button, FormHelperText } from '@material-ui/core';

import * as Styled from './FileInput.style';

export const FileInput = ({ name, label = 'Choisir un fichier' }) => {
  return (
    <Field name={name}>
      {({ input: { onChange, value, ...input }, meta }) => {
        const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
          onChange(evt.target.files);
        };

        return (
          <Styled.Wrapper>
            <input
              {...input}
              accept="image/*"
              onChange={handleChange}
              type="file"
              id={name}
            />
            <FormHelperText>{label}</FormHelperText>
            {value['0']?.name && !meta.error && (
              <Styled.FilePreview>
                <img src={URL.createObjectURL(value[0])} alt="avatar preview" />
              </Styled.FilePreview>
            )}
            <label htmlFor={name}>
              <Button component="span" variant="outlined">
                Choisir un fichier
              </Button>
            </label>
            {meta.error && <FormHelperText error>{meta.error}</FormHelperText>}
          </Styled.Wrapper>
        );
      }}
    </Field>
  );
};
