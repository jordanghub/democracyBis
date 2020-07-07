import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TState } from 'types/state';
import socket from 'utils/websockets';
import { useRouter } from 'next/router';
import { routeChangeComplete, routeChangeStart } from 'store/actions';
import {
  setNotificationCount,
  incrementNotificationCount,
} from 'store/actions/notifications';

export const AppContainer = ({ children }) => {
  const token = useSelector((state: TState) => state.user.token);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleRouteChange = useCallback(() => dispatch(routeChangeStart()), [
    dispatch,
  ]);

  const handleRouteChangeComplete = useCallback(
    () => dispatch(routeChangeComplete()),
    [dispatch],
  );

  const handleNotification = useCallback(() => {
    dispatch(incrementNotificationCount());
  }, [dispatch]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router, handleRouteChange, handleRouteChangeComplete]);

  const handleNewNotification = useCallback(
    (payload) => {
      handleNotification();
    },
    [handleNotification],
  );

  useEffect(() => {
    socket.on('notifications', handleNewNotification);

    return () => {
      socket.off('notifications', handleNewNotification);
    };
  }, []);
  useEffect(() => {
    if (token) {
      socket.emit('login', {
        token,
      });
    }
  }, [token]);

  return <>{children}</>;
};
