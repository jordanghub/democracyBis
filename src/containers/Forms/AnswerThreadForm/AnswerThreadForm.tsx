import React, { useEffect } from 'react';
import { FormRenderProps, Form } from 'react-final-form';
import { Button, Typography } from '@material-ui/core';

import { Text } from 'components/Inputs';
import * as Styled from './AnswerThreadForm.style';
import { ThreadSourcesInput } from 'components/Inputs/ThreadSourcesInput';
import { createThreadAnswerValidation } from 'validators/createThreadAnswerValidation';
import { useSelector } from 'react-redux';
import { TState } from 'types/state';
import { useForms } from 'hooks';

export const AnswerThreadFormComponent = ({
  handleSubmit,
}: FormRenderProps) => {
  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Typography variant="h6" component="p">
        Poster une réponse
      </Typography>
      <Text name="content" multiline label="" rows={15} />
      <ThreadSourcesInput />
      <Button fullWidth variant="contained" type="submit">
        Envoyer la réponse
      </Button>
    </Styled.Form>
  );
};

export const AnswerThreadForm = () => {
  const { createThreadAnswerFormSubmit, resetFormData } = useForms();
  useEffect(() => {
    return () => resetFormData({ formName: 'answer-thread' });
  }, []);

  const formData = useSelector(
    (state: TState) => state.forms.forms['answer-thread'],
  );

  const isSuccess = formData?.submitSuccess;

  const handleSubmit = (values) => {
    createThreadAnswerFormSubmit(values);
  };
  return (
    <Form
      render={(props) => {
        if (isSuccess) {
          props.form.reset();
          resetFormData({ formName: 'answer-thread' });
        }
        return <AnswerThreadFormComponent {...props} />;
      }}
      validate={createThreadAnswerValidation}
      onSubmit={handleSubmit}
    />
  );
};
