import React, { useRef, useEffect, useCallback } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import * as Styled from './Notifications.style';

import { Typography, CircularProgress } from '@material-ui/core';
import { Notification } from './Notification/Notification';

export const Notifications = ({ handleClose }) => {
  const node = useRef(null);

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

  return (
    <Styled.Wrapper ref={node}>
      <Styled.Header>
        <Typography>Notifications</Typography>
        <Styled.Actions>
          <CloseIcon onClick={handleClose} />
        </Styled.Actions>
      </Styled.Header>
      <Styled.NotificationsContainer>
        {/* <div style={{ margin: 'auto' }}>
          <CircularProgress style={{ color: 'white' }} />
        </div> */}
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
        <Notification />
      </Styled.NotificationsContainer>
    </Styled.Wrapper>
  );
};
