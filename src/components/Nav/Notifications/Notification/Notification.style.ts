import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Wrapper = styled.div`
  padding: 0.8rem;
  border-bottom: 1px solid rgba(100, 100, 100, 0.8);

  &:hover {
    background: rgba(100, 100, 100, 0.8);
    cursor: pointer;
  }
  &:last-child {
    border: none;
  }

  & p,
  & span,
  & svg {
    font-size: 0.9rem;
  }

  display: flex;
`;

export const NotificationDate = styled.small`
  color: lightgray;
  display: flex;
  align-items: center;

  & span {
    padding-left: 0.2rem;
  }
`;

export const NotificationImage = styled.div`
  & img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

export const NotificationContent = styled.div`
  margin-left: 0.5rem;
`;
