import React, { useEffect } from 'react';
import { FormRenderProps, Form, AnyObject } from 'react-final-form';
import { Button } from '@material-ui/core';

import { Text, SelectMultipleChips } from 'components/Inputs';
import * as Styled from './CreateThreadForm.style';
import { ThreadSourcesInput } from 'components/Inputs/ThreadSourcesInput';
import { useSelector } from 'react-redux';
import { TState } from 'types/state';
import { createThreadValidation } from 'validators/createThreadValidation';
import { Alert, AlertTitle } from '@material-ui/lab';
import { getErrorFromConstraint } from 'utils/parseFieldsError';
import { useForms } from 'hooks';

export const CreateThreadFormComponent = ({
  handleSubmit,
}: FormRenderProps) => {
  const categories = useSelector((state: TState) => state.thread.categories);
  const formData = useSelector(
    (state: TState) => state.forms.forms['thread-create'],
  );

  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Text name="title" label="Le titre" />
      <Text name="content" multiline label="Le contenu" rows={15} />
      <SelectMultipleChips
        name="categories"
        label="Catégories"
        selectValues={categories || []}
      />
      {formData?.initialData?.selectedText && (
        <>
          <Text
            name="selectedText"
            label="Selection du thread"
            disabled
            multiline
          />
          <div className="hidden-input">
            <Text name="refThreadId" label="" hidden type="hidden" />
            <Text name="refMessageId" label="" hidden type="hidden" />
          </div>
        </>
      )}
      <ThreadSourcesInput />
      <Button variant="contained" type="submit" fullWidth>
        Envoyer
      </Button>
    </Styled.Form>
  );
};

export const CreateThreadForm = () => {
  const { resetFormData, createThreadFormSubmit } = useForms();
  const formData = useSelector(
    (state: TState) => state.forms.forms['thread-create'],
  );

  useEffect(() => {
    return () => resetFormData({ formName: 'thread-create' });
  }, []);

  const initialData: AnyObject = {};

  if (formData?.initialData?.selectedText) {
    initialData.selectedText = formData.initialData.selectedText;
  }
  if (formData?.initialData?.threadId) {
    initialData.refThreadId = formData.initialData.threadId;
  }
  if (formData?.initialData?.refMessageId) {
    initialData.refMessageId = formData.initialData.refMessageId;
  }

  const handleSubmit = (values) => {
    createThreadFormSubmit(values);
  };

  const errors = formData?.errors;
  const isSuccess = formData?.submitSuccess;

  const errorList = getErrorFromConstraint(errors);
  return (
    <Styled.FormWrapper>
      {errors && (
        <Alert severity="error">
          <AlertTitle>Erreur lors de l'envoi</AlertTitle>
          {errorList.map((err: string) => (
            <span key={err}>{err}</span>
          ))}
        </Alert>
      )}
      {isSuccess && (
        <Alert severity="success">
          <AlertTitle> Formulaire envoyé avec succès</AlertTitle>
        </Alert>
      )}
      <Form
        initialValues={initialData}
        render={CreateThreadFormComponent}
        validate={createThreadValidation}
        onSubmit={handleSubmit}
      />
    </Styled.FormWrapper>
  );
};
