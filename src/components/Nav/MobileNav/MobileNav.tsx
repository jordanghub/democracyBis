import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RegisterIcon from '@material-ui/icons/PersonAdd';
import LoginIcon from '@material-ui/icons/AccountCircle';
import NewIcon from '@material-ui/icons/Create';
import LabelIcon from '@material-ui/icons/Label';
import HomeIcon from '@material-ui/icons/Home';
import { LinkComponent } from 'components/Utils';
import { Typography, ListSubheader } from '@material-ui/core';
import * as Styled from './MobileNav.style';

function SwipeableTemporaryDrawer({
  isOpen,
  handleClose,
  handleOpen,
  categories,
  isLoggedIn,
}) {
  type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
  const toggleDrawer = (side: DrawerSide, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
  };

  const sideList = (side: DrawerSide) => (
    <Styled.DrawerLinkList
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List onClick={handleClose}>
        <LinkComponent to={`/`}>
          <ListItem button component="span">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <Typography component="span">Accueil</Typography>
          </ListItem>
        </LinkComponent>
        {isLoggedIn && (
          <LinkComponent to={`/thread/new`}>
            <ListItem button component="span">
              <ListItemIcon>
                <NewIcon />
              </ListItemIcon>

              <Typography component="span">Créer un thread</Typography>
            </ListItem>
          </LinkComponent>
        )}

        {!isLoggedIn && (
          <>
            <LinkComponent to={`/login`}>
              <ListItem button component="span">
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>

                <Typography component="span">Se connecter</Typography>
              </ListItem>
            </LinkComponent>
            <LinkComponent to={`/register`}>
              <ListItem button component="span">
                <ListItemIcon>
                  <RegisterIcon />
                </ListItemIcon>

                <Typography component="span">S'inscrire</Typography>
              </ListItem>
            </LinkComponent>
          </>
        )}

        <ListSubheader>Catégories</ListSubheader>
        {categories?.map((category, index) => (
          <LinkComponent
            to={`/categories/[slug]`}
            visibleLink={`/categories/${category.id}`}
            key={category.name}
          >
            <ListItem button key={category.name} component="span" role="list">
              <ListItemIcon>
                <LabelIcon />
              </ListItemIcon>

              <Typography component="span">{category.name}</Typography>
            </ListItem>
          </LinkComponent>
        ))}
      </List>
      <Divider />
    </Styled.DrawerLinkList>
  );

  return (
    <Styled.Drawer
      open={isOpen}
      onClose={handleClose}
      onOpen={handleOpen}
      id="nav-mobile-menu"
    >
      {sideList('left')}
    </Styled.Drawer>
  );
}

export const MobileNav = ({
  isOpen,
  handleOpen,
  handleClose,
  categories,
  isLoggedIn,
}) => {
  return (
    <SwipeableTemporaryDrawer
      isOpen={isOpen}
      handleClose={handleClose}
      handleOpen={handleOpen}
      categories={categories}
      isLoggedIn={isLoggedIn}
    />
  );
};
