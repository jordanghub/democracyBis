import React from 'react';
import { BASE_API_URL, AVATAR_ENDPOINT } from 'appConstant/apiEndpoint';
import { Avatar as DefaultAvatar } from '@material-ui/core';
import * as Styled from './Avatar.style';
import { IAvatarProps } from './interface';

export const Avatar = ({ username, avatarLink, onClick }: IAvatarProps) => {
  return (
    <Styled.Wrapper onClick={onClick}>
      {avatarLink ? (
        <Styled.UserAvatar>
          <img
            src={`${BASE_API_URL}${AVATAR_ENDPOINT}/${avatarLink}`}
            alt={`avatar de ${username}`}
          />
        </Styled.UserAvatar>
      ) : (
        <DefaultAvatar>{username.toUpperCase().charAt(0)}</DefaultAvatar>
      )}
    </Styled.Wrapper>
  );
};
