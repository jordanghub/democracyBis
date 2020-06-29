import React, { memo } from 'react';
import { Link as LinkIcon } from '@material-ui/icons';
import { Typography } from '@material-ui/core';

import * as Styled from './ThreadSource.style';
import { ThreadSourceProps } from './interface';

export const ThreadSource = memo(({ name, url }: ThreadSourceProps) => (
  <Styled.Wrapper>
    <LinkIcon />
    <Typography component="span">
      <a href={url} target="_blank">
        {name}
      </a>
    </Typography>
  </Styled.Wrapper>
));
