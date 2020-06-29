import { BaseLayout } from 'containers';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Container } from 'components/Utils/Container';

function Error({ statusCode }) {
  return (
    <BaseLayout>
      <Container>
        <Alert severity="error">
          <AlertTitle>
            {statusCode === 404
              ? 'Page non trouvée'
              : 'Une erreur est survenue'}
          </AlertTitle>
        </Alert>
      </Container>
    </BaseLayout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
