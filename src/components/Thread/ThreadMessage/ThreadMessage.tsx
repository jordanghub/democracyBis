import React, { memo, useState, useEffect } from 'react';
import Router from 'next/router';
import { CallSplit } from '@material-ui/icons';
import { SpeedDialAction } from '@material-ui/lab';
import { LinkComponent } from 'components/Utils';
import { checkSelection } from 'validators/checkSelection';
import { MessageHeader } from './MessageHeader';
import { MessageContent } from './MessageContent';
import { MessageSources } from './MessageSources';
import * as Styled from './ThreadMessage.style';
import { ThreadMessageProps } from './interface';
import { Zoom } from '@material-ui/core';

const mapSelection = (items: any, content: string) => {
  let parts: any[] = [content];

  let repeat = false;

  do {
    repeat = false;

    parts.forEach((part, partIndex) => {
      if (repeat) {
        return;
      }
      items.forEach((item: any) => {
        if (repeat) {
          return;
        }

        if (typeof part !== 'string') {
          return;
        }

        const itemParts = part.split(item.selectedItem.selectedText);

        if (itemParts.length > 1) {
          repeat = true;
          const regroupedParts = [
            itemParts[0],
            <HighlightedItem
              text={item.selectedItem.selectedText}
              threadId={item.selectedItem.referenceThread.slug}
            />,
            itemParts[1],
          ];

          if (partIndex === 0) {
            parts.shift();
            parts = [...regroupedParts, ...parts];
          } else if (partIndex === parts.length - 1) {
            parts.pop();
            parts = [...parts, ...regroupedParts];
          } else if (parts.length > 2) {
            parts = [
              ...parts.slice(0, partIndex),
              ...regroupedParts,
              ...parts.slice(partIndex + 1),
            ];
          }
        }
      });
    });
  } while (repeat);

  return parts;
};

const HighlightedItem = ({ text, threadId }) => {
  return (
    <Styled.HightlightedPart>
      <LinkComponent to={`/thread/[slug]`} visibleLink={`/thread/${threadId}`}>
        {text}
      </LinkComponent>
    </Styled.HightlightedPart>
  );
};

export const ThreadMessage = memo(
  ({
    content,
    sources,
    id,
    author,
    date,
    threadId,
    highlightedItems,
    setInitialFormDataAction,
    setFlashMessageAction,
    scoringCategories,
    votes,
  }: ThreadMessageProps) => {
    const [showRefs, changeShowRefs] = useState(false);
    const [contentItems, changeContentItems] = useState([]);

    useEffect(() => {
      if (showRefs) {
        const itemList = mapSelection(highlightedItems, content);
        changeContentItems(itemList);
      } else {
        changeContentItems([content]);
      }
    }, [highlightedItems, content, showRefs]);

    const [toolBarInfo, changeShowTextToolbar] = useState({
      isOpened: false,
      posX: -80,
      posY: 0,
      selectedText: '',
    });
    const handleOnMouseUp = (evt: any) => {
      const selection = window.getSelection();
      if (selection) {
        const text = selection.toString().trim();
        const elemPosition = evt.target.getBoundingClientRect();

        const x = evt.pageX - elemPosition.x;
        const y = evt.pageY - Math.abs(window.scrollY + elemPosition.y);

        if (text !== '') {
          changeShowTextToolbar({
            isOpened: true,
            posX: x,
            posY: y,
            selectedText: text,
          });
        }
      }
    };
    const handleClose = () => {
      changeShowTextToolbar({
        isOpened: false,
        posX: -80,
        posY: 0,
        selectedText: '',
      });
    };

    const handleTextSelect = () => {
      const error = checkSelection(
        highlightedItems,
        toolBarInfo.selectedText,
        content,
      );

      if (error !== '') {
        setFlashMessageAction({
          type: 'error',
          message: error,
        });
        return;
      }

      setInitialFormDataAction({
        formName: 'thread-create',
        data: {
          threadId,
          refMessageId: id,
          selectedText: toolBarInfo.selectedText,
        },
      });

      Router.push('/thread/new');
    };

    const actions = [
      {
        icon: <CallSplit />,
        name: 'Nouveau thread à partir de la sélection',
        onClick: handleTextSelect,
      },
    ];

    const actionsList = actions.map((action) => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={action.onClick}
      />
    ));

    return (
      <Zoom in timeout={500} unmountOnExit>
        <Styled.Wrapper>
          <MessageHeader
            scoringCategories={scoringCategories}
            votes={votes}
            author={author}
            changeShowRefs={changeShowRefs}
            showRefs={showRefs}
            date={date}
            messageId={id}
          />

          <MessageContent
            isOpen={toolBarInfo?.isOpened}
            posX={toolBarInfo.posX}
            posY={toolBarInfo.posY}
            handleOnMouseUp={handleOnMouseUp}
            handleClose={handleClose}
            actionsList={actionsList}
            showRefs={showRefs}
            contentItems={contentItems}
            content={content}
          />

          {sources && sources.length > 0 && (
            <MessageSources sources={sources} />
          )}
        </Styled.Wrapper>
      </Zoom>
    );
  },
);
