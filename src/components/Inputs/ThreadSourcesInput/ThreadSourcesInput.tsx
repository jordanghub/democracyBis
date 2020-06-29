import React, { useState, memo } from 'react';
import { Field } from 'react-final-form';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
import { RemoveCircle } from '@material-ui/icons';

import * as Styled from './ThreadSoucesInput.style';
import validator from 'validator';
import { batch } from 'react-redux';

const checkErrors = ({ label, url }) => {
  const errors: any = {};

  if (label === '' || label.trim() === '') {
    errors.label = 'Le label ne doit pas être vide';
  }

  if (url === '' || url.trim() === '') {
    errors.url = "L'url ne doit pas être vide";
  } else {
    if (!validator.isURL(url)) {
      errors.url = "L'url n'est pas valide";
    }
  }

  return errors;
};

export const ThreadSourcesInput = memo(() => {
  const [labelField, changeLabelField] = useState({
    value: '',
    touched: false,
  });
  const [inputField, changeInputField] = useState({
    value: '',
    touched: false,
  });

  const [errors, changeErrors] = useState({
    url: '',
    label: '',
  });

  const handleLabelChange = (evt: any) => {
    const errors = checkErrors({
      label: evt.target.value,
      url: inputField.value,
    });

    batch(() => {
      changeLabelField({
        value: evt.target.value,
        touched: true,
      });
      changeErrors(errors);
    });
  };
  const handleUrlChange = (evt: any) => {
    const errors = checkErrors({
      label: labelField.value,
      url: evt.target.value,
    });

    batch(() => {
      changeInputField({
        value: evt.target.value,
        touched: true,
      });
      changeErrors(errors);
    });
  };

  return (
    <Field name="sources">
      {({ input }) => {
        const handleAddClick = () => {
          const errorField = checkErrors({
            label: labelField.value,
            url: inputField.value,
          });

          if (errorField.label || errorField.url) {
            batch(() => {
              changeErrors(errorField);
              changeInputField({
                ...inputField,
                touched: true,
              });
              changeLabelField({
                ...labelField,
                touched: true,
              });
            });
          }

          if (!errorField.label && !errorField.url) {
            const newValues = [...input.value];

            newValues.push({
              label: labelField.value,
              url: inputField.value,
            });

            input.onChange(newValues);

            batch(() => {
              changeInputField({
                value: '',
                touched: false,
              });
              changeLabelField({
                value: '',
                touched: false,
              });
              changeErrors({
                url: '',
                label: '',
              });
            });
          }
        };

        const handleRemoveClick = (index: number) => {
          return () => {
            const newValues = input.value.filter(
              (source, sourceIndex: number) => index !== sourceIndex,
            );
            input.onChange(newValues);
          };
        };

        return (
          <Styled.Wrapper>
            {// Sources list
            Array.isArray(input.value) && input.value.length > 0 && (
              <Styled.SourceList>
                <Typography variant="h6">Liste des sources</Typography>
                {input.value?.map((val, index) => (
                  <Styled.SourceItem container xs={12} alignContent="center">
                    <Typography component="span">
                      <a href={val.url} target="_blank">
                        {val.label}
                      </a>
                    </Typography>
                    <RemoveCircle
                      cursor="pointer"
                      color="action"
                      onClick={handleRemoveClick(index)}
                    />
                  </Styled.SourceItem>
                ))}
              </Styled.SourceList>
            )}
            <Styled.SourceInput container justify="space-between">
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  onChange={handleLabelChange}
                  value={labelField.value}
                  error={!!(labelField.touched && errors.label)}
                  helperText={labelField.touched && errors.label}
                  label="Label de la source"
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error={!!(inputField.touched && errors.url)}
                  fullWidth
                  onChange={handleUrlChange}
                  value={inputField.value}
                  helperText={inputField.touched && errors.url}
                  label="Url de la source"
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Button variant="contained" onClick={handleAddClick} fullWidth>
                  ajouter
                </Button>
              </Grid>
            </Styled.SourceInput>
          </Styled.Wrapper>
        );
      }}
    </Field>
  );
});
