import React from 'react';
import { CircularProgress } from '@material-ui/core';

import * as Styled from './Loader.style';

export const Loader = () => (
  <Styled.Wrapper>
    <CircularProgress />
  </Styled.Wrapper>
);
