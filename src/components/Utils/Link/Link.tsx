import React, { memo } from 'react';

import * as Styled from './Link.style';
import { LinkProps } from './interface';

import Link from 'next/link';
import { Button } from '@material-ui/core';

export const LinkComponent = memo(
  ({ to, children, visibleLink, isButton, shallow = false }: LinkProps) => (
    <Link href={to} as={visibleLink} shallow={shallow}>
      {isButton ? (
        <Button href={visibleLink ? visibleLink : to}>{children}</Button>
      ) : (
        <Styled.LinkStyle href={visibleLink ? visibleLink : to}>
          {children}
        </Styled.LinkStyle>
      )}
    </Link>
  ),
);
