import React from 'react';
import { AlertTitle } from '@material-ui/lab';
import { Typography } from '@material-ui/core';

import * as Styled from './ThreadOriginalSelection.style';
import { ThreadLink } from 'components/Utils/ThreadLink';

export const ThreadOriginalSelection = ({ slug, title, selectedText }) => {
  return (
    <Styled.Wrapper severity="info">
      <AlertTitle>
        Ce thread à été ouvert à partir d'une selection dans un message d'un
        autre thread
      </AlertTitle>
      <ThreadLink slug={slug}>{title}</ThreadLink>
      <Typography>{selectedText}</Typography>
    </Styled.Wrapper>
  );
};
