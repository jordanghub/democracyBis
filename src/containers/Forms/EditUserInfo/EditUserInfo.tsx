import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import { AnyObject, FormApi } from 'final-form';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useSelector } from 'react-redux';

import { registerFormValidation } from 'validators/registerForm';
import { getErrorFromConstraint } from 'utils/parseFieldsError';
import * as Styled from './EditUserInfo.style';
import { TState } from 'types/state';

import { RegisterFormComponent } from '../RegisterForm';
import { useForms } from 'hooks';
import { editUserFormValidation } from 'validators/editUserValidator';

export const EditUserInfo = () => {
  // TODO créer les actions

  const { resetFormData, userEditFormSubmit } = useForms();

  useEffect(() => {
    return () => resetFormData({ formName: 'editProfile' });
  }, []);

  const handleSubmit = (data: AnyObject, form: FormApi) => {
    userEditFormSubmit(data);
  };
  const userData = useSelector((state: TState) => state.user.userData);

  const formData = useSelector(
    (state: TState) => state.forms.forms.editProfile,
  );

  const initialData = {
    username: userData.username,
    email: userData.email,
  };

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

      <Form
        initialValues={initialData}
        render={(props) => <RegisterFormComponent {...props} edit />}
        validate={editUserFormValidation}
        onSubmit={handleSubmit}
      />
    </Styled.FormWrapper>
  );
};
