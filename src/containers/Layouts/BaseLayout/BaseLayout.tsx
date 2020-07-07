import React, { useCallback, useEffect } from 'react';
import { Nav } from 'components/Nav';
import { BaseLayoutProps } from './interface';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { TState } from 'types/state';
import { logout, toggleDarkMode, checkStorageValues } from 'store/actions';
import { lightTheme, darkTheme } from 'theme';
import * as Styled from './BaseLayout.style';
import { FlashMessage } from 'containers/FlashMessage/FlashMessage';
import Error from 'pages/_error';

import {
  createMuiTheme,
  ThemeProvider as MaterialThemeProvider,
  NoSsr,
  Container,
  Modal,
} from '@material-ui/core';
import styled, {
  ThemeProvider as StyledThemeProvider,
} from 'styled-components';
import {
  Brightness3 as DarkIcon,
  WbSunny as LightIcon,
} from '@material-ui/icons';
import { ToggleButton } from '@material-ui/lab';
import { Thread } from 'containers/Thread';
import { useThread } from 'hooks';
import { useRouter } from 'next/router';
import { getActiveNotificationCount } from 'store/actions/notifications';

export const BaseLayout = ({
  children,
  title = 'Democracy',
  description,
  statusCode,
}: BaseLayoutProps) => {
  const dispatch = useDispatch();

  const { flashMessage, isPageLoading, isDarkMode } = useSelector(
    (state: TState) => state.app,
  );
  const categories = useSelector((state: TState) => state.thread.categories);
  const { isLoggedIn, userData } = useSelector((state: TState) => state.user);

  const checkLocalStorageValuesAction = useCallback(
    () => dispatch(checkStorageValues()),
    [dispatch],
  );

  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  const toggleDarkModeAction = useCallback(() => dispatch(toggleDarkMode()), [
    dispatch,
  ]);

  const getActiveNotificationCountAction = useCallback(
    () => dispatch(getActiveNotificationCount()),
    [dispatch],
  );

  // Modal thread
  const { thread, clearThreadSingle } = useThread();

  const notificationCount = useSelector(
    (state: TState) => state.notifications.count,
  );

  const router = useRouter();

  const currentPath = router.asPath;

  const handleModalClose = useCallback(() => {
    history.pushState(null, null, currentPath);
    clearThreadSingle();
  }, [currentPath]);

  useEffect(() => {
    checkLocalStorageValuesAction();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      getActiveNotificationCountAction();
    }
  }, [isLoggedIn]);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: isDarkMode ? 'dark' : 'light',
          background: {
            paper: isDarkMode
              ? darkTheme.default.paperColor
              : lightTheme.default.paperColor,
          },
        },
      }),
    [isDarkMode],
  );

  return statusCode ? (
    <Error statusCode={statusCode} />
  ) : (
    <StyledThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Styled.Wrapper>
        <Head>
          <title>{title}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          {description && <meta name="description" content={description} />}
        </Head>
        <MaterialThemeProvider theme={theme}>
          <Nav
            isLoggedIn={isLoggedIn}
            logoutCallback={logoutAction}
            categories={categories}
            userData={userData}
            notificationCount={notificationCount}
          />

          {isPageLoading && <Styled.Loading color="secondary" />}
          {flashMessage && <FlashMessage />}
          {/* <NoSsr>
            <Styled.DarkModeToggle>
              <ToggleButton
                value="check"
                selected={isDarkMode}
                onChange={toggleDarkModeAction}
              >
                {isDarkMode ? <LightIcon /> : <DarkIcon />}
              </ToggleButton>
            </Styled.DarkModeToggle>
          </NoSsr> */}

          {children}
          <NoSsr>
            {!!thread.threadSingle && router.pathname !== '/thread/[slug]' && (
              <ThreadModal
                closeAfterTransition
                open={!!thread.threadSingle}
                onClose={handleModalClose}
              >
                <Container>
                  <Thread slug={thread.threadSingle.slug} />
                </Container>
              </ThreadModal>
            )}
          </NoSsr>
        </MaterialThemeProvider>
      </Styled.Wrapper>
    </StyledThemeProvider>
  );
};

export const ThreadModal = styled(Modal)`
  overflow-y: auto;
  overflow-x: hidden;
  & .MuiContainer-root {
    outline: none;
    border: none;
    margin-top: 0;
    background: ${(props) => props.theme.default.background};
    padding: 1rem;
  }
`;
