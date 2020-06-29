import React, { memo, useState, useRef, useEffect } from 'react';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  MenuItem,
  Popper,
  Paper,
  useMediaQuery,
  ClickAwayListener,
  Badge,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ArrowDropDown,
  Notifications as NotificationIcon,
} from '@material-ui/icons';

import * as Styled from './Nav.style';

import { LinkComponent } from 'components/Utils';
import { NavProps } from './interface';
import { Search } from 'containers/Search';
import { UserMenu } from './UserMenu';
import { MobileNav } from './MobileNav';
import { Notifications } from './Notifications';

export const Nav = memo(
  ({ isLoggedIn, categories, userData, notificationCount }: NavProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);

    const handleNotificationMenuClick = () =>
      setIsNotificationMenuOpen(!isNotificationMenuOpen);

    const handleMobileNavOpen = () => setIsMobileNavOpen(true);
    const handleMobileNavClose = () => setIsMobileNavOpen(false);

    const menuRef = useRef<HTMLDivElement | null>(null);

    const handleCategoriesMenuClose = () => {
      setIsMenuOpen(false);
    };
    const handleCategoriesMenuOpen = () => {
      setIsMenuOpen(true);
    };

    const menuCategories = (
      <ClickAwayListener onClickAway={handleCategoriesMenuClose}>
        <Styled.MenuCategories
          anchorEl={menuRef.current}
          id="menu-categories"
          open={isMenuOpen}
          disablePortal
        >
          <Paper elevation={6} component="div" role="list">
            {categories?.map((category) => (
              <LinkComponent
                to={`/categories/[slug]`}
                visibleLink={`/categories/${category.id}`}
                key={category.name}
              >
                <MenuItem onClick={handleCategoriesMenuClose} component="span">
                  {category.name}
                </MenuItem>
              </LinkComponent>
            ))}
          </Paper>
        </Styled.MenuCategories>
      </ClickAwayListener>
    );

    const isMobile = useMediaQuery('(max-width:1024px)');
    const isSm = useMediaQuery('(max-width:600px)');

    useEffect(() => {
      if (!isMobile) {
        handleMobileNavClose();
      }
    }, [isMobile]);

    return (
      <Styled.Wrapper>
        {isMenuOpen && menuCategories}
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Grid container justify="space-between" direction="row">
              <Grid item container alignItems="center" xs={12} sm>
                <Grid item xs={12} container alignItems="center" sm={4}>
                  {isMobile && (
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={handleMobileNavOpen}
                      id="nav-mobile-button-toggle"
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                  <LinkComponent to="/" isButton>
                    Democracy
                  </LinkComponent>
                  {isLoggedIn && isSm && <UserMenu userData={userData} />}
                </Grid>

                <Styled.SearchContainer item xs={12} sm>
                  <Search />
                </Styled.SearchContainer>
              </Grid>

              <Grid
                item
                container
                alignItems="center"
                xs
                justify="flex-end"
                id="desktop-nav"
              >
                <div>
                  {isNotificationMenuOpen && (
                    <Notifications handleClose={handleNotificationMenuClick} />
                  )}

                  <Badge
                    color="secondary"
                    overlap="circle"
                    badgeContent={notificationCount || 0}
                    onClick={handleNotificationMenuClick}
                  >
                    <NotificationIcon />
                  </Badge>
                </div>
                <Typography
                  ref={menuRef}
                  component="span"
                  className="MuiButton-root"
                  id="nav-category-button"
                  onClick={handleCategoriesMenuOpen}
                >
                  CATEGORIES
                  <ArrowDropDown />
                </Typography>
                {!isLoggedIn && !isMobile && (
                  <>
                    <LinkComponent to="/register" isButton>
                      S'inscrire
                    </LinkComponent>
                    <LinkComponent to="/login" isButton>
                      Se connecter
                    </LinkComponent>
                  </>
                )}

                {isLoggedIn && !isMobile && (
                  <>
                    <LinkComponent to="/thread/new" isButton>
                      Créer un thread
                    </LinkComponent>
                  </>
                )}
              </Grid>

              {isMobile && (
                <MobileNav
                  isLoggedIn={isLoggedIn}
                  isOpen={isMobileNavOpen}
                  handleClose={handleMobileNavClose}
                  handleOpen={handleMobileNavOpen}
                  categories={categories}
                />
              )}

              {isLoggedIn && !isSm && <UserMenu userData={userData} />}
            </Grid>
          </Toolbar>
        </AppBar>
      </Styled.Wrapper>
    );
  },
);
