import { NextPage } from 'next';

import { BaseLayout } from 'containers';
import { LoginForm } from 'containers/Forms';
import { Typography } from '@material-ui/core';
import { Container } from 'components';
import { onlyAnonymousPage } from 'utils/checkAuthServ';

const Login: NextPage = () => {
  return (
    <BaseLayout title="Connexion">
      <Container>
        <Typography variant="h4" component="h2">
          Se connecter
        </Typography>
        <LoginForm />
      </Container>
    </BaseLayout>
  );
};

Login.getInitialProps = async (ctx) => {
  const token = onlyAnonymousPage(ctx);
  return {};
};
export default Login;
