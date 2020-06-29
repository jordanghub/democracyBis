import { NextPage, NextPageContext } from 'next';
import { Store } from 'redux';
import { BaseLayout } from 'containers';
import { getAxios } from 'utils/Axios';
import { Alert, AlertTitle, Color } from '@material-ui/lab';
import {
  BASE_API_URL,
  EMAIL_VALIDATION,
  RESEND_VALIDATION_EMAIL,
} from 'appConstant/apiEndpoint';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect } from 'react';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { validateEmail, resendConfirmationEmailFromToken } from 'store/actions';

interface IEmailVerificationProps {
  message: {
    type: any;
    message: string;
  };
  isTokenExpired?: boolean;
  token: any;
}

const EmailVerification: NextPage<IEmailVerificationProps> = () => {
  const router = useRouter();

  const { token } = router.query;

  const dispatch = useDispatch();

  const resendValidationEmailFromToken = useCallback(
    (payload) => {
      dispatch(resendConfirmationEmailFromToken(payload));
    },
    [dispatch],
  );

  const validateEmailAction = useCallback(
    (payload) => {
      dispatch(validateEmail(payload));
    },
    [dispatch],
  );

  const handleButtonClick = useCallback(() => {
    resendValidationEmailFromToken({
      token,
    });
  }, [token]);

  useEffect(() => {
    validateEmailAction({
      token,
    });
  }, [token]);

  return (
    <BaseLayout>
      <Typography
        variant="h4"
        style={{ padding: '1rem', display: 'flex', alignItems: 'center' }}
      >
        Vérification en cours... Vous allez être redirigé
        <div style={{ marginLeft: '1rem' }}>
          <CircularProgress />
        </div>
      </Typography>
    </BaseLayout>
  );
};

export default EmailVerification;
