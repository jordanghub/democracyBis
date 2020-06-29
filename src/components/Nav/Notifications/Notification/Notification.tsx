import React from 'react';
import { ChatBubbleOutline as DateIcon } from '@material-ui/icons';
import * as Styled from './Notification.style';
import { Typography } from '@material-ui/core';
export const Notification = () => {
  return (
    <Styled.Wrapper>
      <Styled.NotificationImage>
        <img
          src="http://192.168.1.22:3000/avatars/c4585b4efd255a755a4bc71310668fecd.jpg"
          alt="djklfshd"
        />
      </Styled.NotificationImage>
      <Styled.NotificationContent>
        <Typography component="p" className="notification-message">
          machin a posté une réponse sur votre message
        </Typography>
        <Styled.NotificationDate>
          <DateIcon fontSize="small" />
          <Typography component="span">Il y a 20 minutes</Typography>
        </Styled.NotificationDate>
      </Styled.NotificationContent>
    </Styled.Wrapper>
  );
};
