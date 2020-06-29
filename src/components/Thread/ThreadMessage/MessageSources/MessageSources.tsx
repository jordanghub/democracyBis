import React from 'react';

import * as Styled from './MessageSources.style';
import { Typography } from '@material-ui/core';
import { ThreadSource } from 'components';

export const MessageSources = ({ sources }) => {
  const sourcesList = sources?.map((source) => (
    <ThreadSource key={source.id} name={source.label} url={source.url} />
  ));
  return (
    <Styled.Sources>
      <Typography variant="h6">Liste des sources</Typography>
      {sourcesList && sourcesList.length > 0 ? (
        sourcesList
      ) : (
        <Typography>Aucune source liée à ce message</Typography>
      )}
    </Styled.Sources>
  );
};
