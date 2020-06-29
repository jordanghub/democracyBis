import React from 'react';

import * as Styled from './MessageContent.style';
import { Typography } from '@material-ui/core';
import { SpeedDial, SpeedDialIcon } from '@material-ui/lab';

export const MessageContent = ({
  isOpen,
  posX,
  posY,
  handleOnMouseUp,
  handleClose,
  actionsList,
  showRefs,
  contentItems,
  content,
}: any) => {
  return (
    <Styled.MessageContent posX={posX} posY={posY}>
      <Typography component="pre" onMouseUp={handleOnMouseUp}>
        {showRefs ? contentItems : content}
      </Typography>

      {isOpen && (
        <SpeedDial
          ariaLabel="SpeedDial example"
          icon={<SpeedDialIcon onClick={handleClose} />}
          direction="down"
          open
        >
          {actionsList}
        </SpeedDial>
      )}
    </Styled.MessageContent>
  );
};
