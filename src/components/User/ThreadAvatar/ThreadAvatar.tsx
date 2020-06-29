import React from 'react';
import { BASE_API_URL, AVATAR_ENDPOINT } from 'appConstant/apiEndpoint';
import { Avatar as DefaultAvatar, Grid, Typography } from '@material-ui/core';
import * as Styled from './ThreadAvatar.style';
import { IThreadAvatarProps } from './interface';
import { Avatar } from '../Avatar';

export const ThreadAvatar = ({
  avatarLink,
  username,
  date,
}: IThreadAvatarProps) => {
  return (
    <Styled.Wrapper
      container
      alignItems="center"
      justify="flex-start"
      className="Avatar-user"
    >
      <Styled.Avatar>
        <Avatar username={username} avatarLink={avatarLink} />
      </Styled.Avatar>
      <Styled.UserData>
        <Styled.Username>{username}</Styled.Username>
        <Typography component="small">{date}</Typography>
      </Styled.UserData>
    </Styled.Wrapper>
  );
};
