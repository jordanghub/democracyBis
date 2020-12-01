import React, {
  useRef,
  useEffect,
  useCallback,
  useMemo,
  useState,
} from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as Styled from './Notifications.style';

import { Typography, CircularProgress } from '@material-ui/core';
import { ThreadMessageNotification } from './Notification/Notification';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNotifications,
  clearNotifications,
} from 'store/actions/notifications';
import { TState } from 'types/state';
import { IThreadMessageNotification } from './Notification/interface';
import { usePagination } from 'hooks';

export const Notifications = ({ handleClose }) => {
  const node = useRef(null);

  const dispatch = useDispatch();

  const { items } = useSelector((state: TState) => state.notifications);

  const fetchNotificationsAction = useCallback(
    (payload = null) => dispatch(fetchNotifications(payload)),
    [],
  );

  const { isLoading, handlePageChange } = usePagination(
    'notifications',
    fetchNotificationsAction,
  );

  const clearNotificationsAction = useCallback(
    () => dispatch(clearNotifications()),
    [dispatch],
  );

  useEffect(() => {
    fetchNotificationsAction();

    return () => {
      clearNotificationsAction();
    };
  }, []);

  const handleScroll = useCallback(
    (evt) => {
      const sizes = evt.target.getBoundingClientRect();

      if (evt.target.scrollHeight === sizes.height + evt.target.scrollTop) {
        handlePageChange();
      }
    },
    [handlePageChange],
  );

  const handleClickOut = useCallback(
    (e) => {
      if (!node.current.contains(e.target)) {
        handleClose();
      }
    },
    [node],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOut);

    return () => {
      document.removeEventListener('mousedown', handleClickOut);
    };
  }, [handleClickOut]);

  const notifs = useMemo(
    () =>
      items?.map((item) => {
        switch (item.type) {
          case 'threadMessage': {
            const notificationPayload: IThreadMessageNotification = JSON.parse(
              item.payload,
            );
            return (
              <ThreadMessageNotification
                key={item.id}
                active={item.active}
                payload={notificationPayload}
                createdAt={item.createdAt}
              />
            );
          }
        }
      }),
    [items],
  );

  return (
    <Styled.Wrapper ref={node}>
      <Styled.Header>
        <Typography>Notifications</Typography>
        <Styled.Actions>
          <CloseIcon onClick={handleClose} />
        </Styled.Actions>
      </Styled.Header>
      <Styled.NotificationsContainer onScroll={handleScroll}>
        {notifs}
        {(isLoading || !notifs) && (
          <div style={{ margin: 'auto' }}>
            <CircularProgress />
          </div>
        )}

        {
          notifs && notifs.length === 0 && (
            <Styled.NoNotificationMessage>Aucune notification</Styled.NoNotificationMessage>
          )
        }
      </Styled.NotificationsContainer>
    </Styled.Wrapper>
  );
};
