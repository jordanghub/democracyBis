import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Wrapper = styled.span`
  padding: 0.8rem;
  position: relative;
  border-bottom: 1px solid rgba(100, 100, 100, 0.8);

  &:hover {
    background: ${(props) => props.theme.notifications.single.hover.background};
    /* background: teal; */
    color: ${(props) => props.theme.notifications.single.hover.color};
    cursor: pointer;
  }
  &:last-child {
    border: none;
  }

  & span,
  & svg {
    font-size: 0.9rem;
  }
  & .MuiAvatar-root {
    width: 50px;
    height: 50px;
    font-size: 1.4rem;
  }

  display: flex;
`;

export const NotificationDate = styled.small`
  color: ${(props) => props.theme.notifications.single.dateColor};
  display: flex;
  align-items: center;

  & span {
    padding-left: 0.2rem;
  }
`;

export const NotificationImage = styled.span`
  display: block;
  & img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const NotificationContent = styled.span`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`;

export const ActiveNotificationDot = styled.span`
  display: block;
  width: 5px;
  height: 5px;
  background: red;
  border-radius: 50%;
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
`;
