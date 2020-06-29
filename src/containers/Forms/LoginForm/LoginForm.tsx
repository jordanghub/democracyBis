import React, { useEffect, useCallback } from 'react';
import { FormRenderProps, Form, AnyObject } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { FormApi } from 'final-form';
import { Button } from '@material-ui/core';

import { Text } from 'components/Inputs';
import { loginFormValidation } from 'validators/loginForm';
import * as Styled from './LoginForm.style';
import { TState } from 'types/state';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useForms } from 'hooks';
import { resendConfirmationEmail } from 'store/actions';

export const LoginFormComponent = ({ handleSubmit }: FormRenderProps) => {
  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Text name="username" label="Nom d'utilisateur" />
      <Text name="password" type="password" label="Mot de passe" />
      <Button variant="contained" type="submit">
        Se connecter
      </Button>
    </Styled.Form>
  );
};

export const LoginForm = () => {
  const { resetFormData, loginFormSubmit } = useForms();

  const dispatch = useDispatch();

  const resendConfirmatonEmailAction = useCallback(
    () => dispatch(resendConfirmationEmail()),
    [dispatch],
  );

  useEffect(() => {
    return () => resetFormData({ formName: 'login' });
  }, []);

  const formData = useSelector((state: TState) => state.forms.forms.login);

  const handleSubmit = (data: AnyObject, form: FormApi) => {
    loginFormSubmit(data);
  };

  return (
    <Styled.FormWrapper>
      {formData && formData.errors && (
        <Alert severity="error">
          <AlertTitle>Erreur lors de l'envoi</AlertTitle>
          {formData.errors.submitError}
          {formData.errors.errorType &&
            formData.errors.errorType === 'not_activated' && (
              <Button
                onClick={resendConfirmatonEmailAction}
                variant="contained"
              >
                Renvoyer l'email de confirmation
              </Button>
            )}
        </Alert>
      )}
      <Form
        render={LoginFormComponent}
        validate={loginFormValidation}
        onSubmit={handleSubmit}
      />
    </Styled.FormWrapper>
  );
};

const formValidation = () => {
  return {};
};
