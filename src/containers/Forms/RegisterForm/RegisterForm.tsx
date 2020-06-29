import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import { AnyObject, FormApi } from 'final-form';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';

import { LinkComponent } from 'components';
import { registerFormValidation } from 'validators/registerForm';
import { getErrorFromConstraint } from 'utils/parseFieldsError';
import { Text } from 'components/Inputs';
import * as Styled from './RegisterForm.style';
import { TState } from 'types/state';
import { FileInput } from 'components/Inputs/FileInput/FileInput';
import { useForms } from 'hooks';

export const RegisterFormComponent = ({
  handleSubmit,
  form,
  submitting,
  edit = false,
}) => {
  return (
    <Styled.Form onSubmit={handleSubmit}>
      <Text name="username" label="Nom d'utilisateur" disabled={edit} />

      {edit && (
        <>
          <Text
            name="currentPassword"
            type="password"
            label="Mot de passe actuel"
          />
        </>
      )}

      <Text
        name="password"
        type="password"
        label={edit ? 'Nouveau mot de passe' : 'Mot de passe'}
      />
      <Text
        name="confirmPassword"
        type="password"
        label="Répéter le mot de passe"
      />

      <Text name="email" label="Email" />
      <FileInput name="avatar" label="Avatar (optionnel) 50*50px (50ko max)" />
      <Button variant="contained" type="submit" disabled={submitting}>
        Envoyer
      </Button>
    </Styled.Form>
  );
};

export const RegisterForm = () => {
  const { registerFormSubmit, resetFormData } = useForms();

  useEffect(() => {
    return () => resetFormData({ formName: 'register' });
  }, []);

  const handleSubmit = (data: AnyObject, form: FormApi) => {
    registerFormSubmit(data);
  };

  // TODO find a way to show server errors properly
  const formData = useSelector((state: TState) => state.forms.forms.register);

  const isSuccess = formData?.submitSuccess;
  const errors = formData?.errors;

  const errorList = getErrorFromConstraint(errors);

  return (
    <Styled.FormWrapper>
      {errors && (
        <Alert severity="error">
          <AlertTitle>Erreur lors de l'envoi</AlertTitle>
          {errorList?.map((err: string) => (
            <span key={err}>{err}</span>
          ))}
        </Alert>
      )}

      {isSuccess && (
        <Alert severity="success">
          <AlertTitle> Formulaire envoyé avec succès</AlertTitle>
          <span>
            L'inscription s'est déroulée avec succès, vous devez vérifier votre
            adresse e-mail avant de pouvoir vous connecter
          </span>
        </Alert>
      )}

      <Form
        render={RegisterFormComponent}
        validate={registerFormValidation}
        onSubmit={handleSubmit}
      />
    </Styled.FormWrapper>
  );
};
