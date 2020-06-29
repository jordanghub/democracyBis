import React, { useRef, useState, useEffect } from 'react';
import { CircleSvg } from './CircleSvg';

import * as Styled from './CircleVotes.style';
import { Typography, Paper, Popper, Grid } from '@material-ui/core';
import { voteColors } from 'appConstant/misc';

export const CircleVotes = ({ votes, scoringCategories }) => {
  const circleList = scoringCategories?.map((category, index) => {
    const currentVote = votes.find((vote) => vote.category === category.name);
    return (
      <React.Fragment key={category.name}>
        <CircleSvg
          r={10 + 7 * (scoringCategories.length - 1 - index)}
          color={voteColors[index]}
          value={currentVote?.average || 0}
          label={category.name}
          count={currentVote?.voteCount || 0}
        />
        {/* {index === scoringCategories.length - 1 && (
          <CircleSvg
            handleOpen={handleOpen}
            handleClose={handleClose}
            r={10 + 7 * (index + 2)}
            color="teal"
            value={100}
          />
        )} */}
      </React.Fragment>
    );
  });

  return (
    <Styled.CircleComponentStyle width="80" height="80">
      {circleList}
    </Styled.CircleComponentStyle>
  );
};
