import React, { useState, useRef, useEffect } from 'react';
import {
  MenuItem,
  Typography,
  Grid,
  Popper,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import { LinkComponent } from 'components';
import { Avatar } from 'components/User/Avatar';

import * as Styled from './UserMenu.style';

export const UserMenu = ({ userData }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserMenuOpen = () => {
    setIsUserMenuOpen(true);
  };
  const handleUserMenuClose = () => {
    setIsUserMenuOpen(false);
  };

  if (!userData) {
    return <div></div>;
  }

  return (
    <Styled.Wrapper>
      {isUserMenuOpen && (
        <ClickAwayListener onClickAway={handleUserMenuClose}>
          <Styled.Menu anchorEl={menuRef.current} id="nav-user-menu" open>
            <Paper elevation={6} component="div" role="list">
              <Styled.UserData container alignItems="center">
                <Avatar
                  username={userData.username}
                  avatarLink={userData.avatarFileName}
                />
                <Typography>{userData.email}</Typography>
              </Styled.UserData>

              <LinkComponent to="/profile">
                <MenuItem
                  onClick={handleUserMenuClose}
                  component="span"
                  role="listitem"
                >
                  Mon profil
                </MenuItem>
              </LinkComponent>
              <Typography component="a" href="/logout">
                <MenuItem onClick={handleUserMenuClose} component="span">
                  Me déconnecter
                </MenuItem>
              </Typography>
            </Paper>
          </Styled.Menu>
        </ClickAwayListener>
      )}

      <Styled.MenuToggle ref={menuRef} onClick={handleUserMenuOpen}>
        {userData && (
          <Avatar
            username={userData.username}
            avatarLink={userData.avatarFileName}
          />
        )}
      </Styled.MenuToggle>
    </Styled.Wrapper>
  );
};
