import React, { memo } from 'react';
import { ChatBubbleOutline as DateIcon } from '@material-ui/icons';
import * as Styled from './Notification.style';
import { Typography, Avatar } from '@material-ui/core';
import { AVATAR_ENDPOINT, BASE_API_URL } from 'appConstant/apiEndpoint';
import { dateSinceNow } from 'utils/dateRange';
import { ThreadLink } from 'components/Utils/ThreadLink';

export const ThreadMessageNotification = memo(
  ({ active, payload, createdAt }: any) => {
    const { authorName, authorThumbnail, threadTitle } = payload;
    return (
      <ThreadLink slug={payload.threadSlug}>
        <Styled.Wrapper>
          {active && <Styled.ActiveNotificationDot />}

          <Styled.NotificationImage>
            {authorThumbnail ? (
              <img
                src={`${BASE_API_URL}${AVATAR_ENDPOINT}/${authorThumbnail}`}
                alt={`avatar ${authorName}`}
              />
            ) : (
              <Avatar component="span" sizes="50px 50px">
                {authorName[0]}
              </Avatar>
            )}
          </Styled.NotificationImage>
          <Styled.NotificationContent>
            <Typography component="span">
              {authorName} a posté une réponse sur le thread :
            </Typography>
            <Typography component="span">"{threadTitle}"</Typography>
            <Styled.NotificationDate>
              <DateIcon fontSize="small" />
              <Typography component="span">
                {dateSinceNow(createdAt)}
              </Typography>
            </Styled.NotificationDate>
          </Styled.NotificationContent>
        </Styled.Wrapper>
      </ThreadLink>
    );
  },
);
