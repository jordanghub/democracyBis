import styled from 'styled-components';

export const MessageContent = styled.div<MessageContentStyleProps>`
  position: relative;

  & .MuiSpeedDial-root {
    position: absolute;
    transform: translateY(-50%);
    top: ${(props) => props.posY}px;
    left: ${(props) => props.posX + 50}px;
  }

  & pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;
type MessageContentStyleProps = {
  posX: number;
  posY: number;
};
