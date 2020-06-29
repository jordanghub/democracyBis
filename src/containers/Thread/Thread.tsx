import React, { useEffect, useCallback, useMemo } from 'react';

import * as Styled from './Thread.style';
import { ThreadHomepage, ThreadMessage } from 'components';
import { AnswerThreadForm } from 'containers/Forms/AnswerThreadForm';
import { ThreadOriginalSelection } from 'components/Thread/ThreadOriginalSelection';
import { useDispatch, useSelector } from 'react-redux';
import { setFlashMessage, toggleThreadLock } from 'store/actions';
import socket from 'utils/websockets';
import { EVENT_NEW_THREAD_MESSAGE } from 'appConstant/websockets';
import { Backdrop, CircularProgress, Typography } from '@material-ui/core';

import { useThread } from 'hooks';
import { useForms } from 'hooks';
import { TState } from 'types/state';
import { IThreadContainerProps } from './interface';
import { ThreadModeration } from 'components/Thread/ThreadModeration';
import { AlertTitle } from '@material-ui/lab';
import { findRoleInUser } from 'utils/findInUserRole';

export const Thread = ({ slug }: IThreadContainerProps) => {
  const dispatch = useDispatch();

  const { isLoggedIn, userData } = useSelector((state: TState) => state.user);
  const { scoringCategories } = useSelector((state: TState) => state.votes);

  const isModeratorOrAdmin = useMemo(
    () => findRoleInUser(['ROLE_ADMIN', 'ROLE_MODERATOR'], userData?.roles),
    [userData],
  );

  const setFlashMessageAction = useCallback(
    (payload) => dispatch(setFlashMessage(payload)),
    [dispatch],
  );

  const threadLockAction = useCallback(
    (payload) => dispatch(toggleThreadLock(payload)),
    [dispatch],
  );

  const { thread, addNewThreadMessage } = useThread();
  const { setInitialFormData } = useForms();

  useEffect(() => {
    if (thread?.threadSingle?.id && typeof window !== 'undefined') {
      socket.on(
        `${EVENT_NEW_THREAD_MESSAGE}${thread.threadSingle.id}`,
        addNewThreadMessage,
      );
      return () => {
        socket.off(
          `${EVENT_NEW_THREAD_MESSAGE}${thread.threadSingle.id}`,
          addNewThreadMessage,
        );
      };
    }
  }, [thread?.threadSingle?.id]);

  if (!thread.threadSingle) {
    return (
      <Backdrop open={!thread.threadSingle} timeout={500}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }
  const {
    id,
    messages,
    originalSelection,
    title,
    createdAt,
    author,
    categories,
    locked,
    votes,
  } = thread.threadSingle;

  const messagesList = messages.map((message) => (
    <ThreadMessage
      scoringCategories={scoringCategories}
      votes={message.votes || []}
      setFlashMessageAction={setFlashMessageAction}
      setInitialFormDataAction={setInitialFormData}
      threadId={id}
      key={message.id}
      id={message.id}
      highlightedItems={message.highlightedItems}
      content={message.content}
      sources={message.sources}
      author={message.author}
      date={message.createdAt}
    />
  ));
  return (
    <Styled.Wrapper>
      {originalSelection && (
        <ThreadOriginalSelection
          slug={originalSelection.thread.slug}
          selectedText={originalSelection.selectedText}
          title={originalSelection.thread.title}
        />
      )}
      {isModeratorOrAdmin && (
        <ThreadModeration
          lockData={locked}
          toggleThreadLockAction={threadLockAction}
        />
      )}
      <ThreadHomepage
        slug={slug}
        id={id}
        title={title}
        author={author}
        date={createdAt}
        categories={categories}
        withoutLink
        messageType="thread"
        votes={votes}
        scoringCategories={scoringCategories}
      />
      <Styled.Messages>{messagesList}</Styled.Messages>
      {isLoggedIn && (!locked || isModeratorOrAdmin) && <AnswerThreadForm />}
      {!isLoggedIn && !locked && (
        <Styled.NotLoggedInMessage>
          <Typography component="p" variant="h6">
            Vous devez être connecté pour envoyer un message
          </Typography>
        </Styled.NotLoggedInMessage>
      )}

      {locked && (
        <Styled.LockedMessage severity="error">
          <AlertTitle>
            Ce thread a été vérouillé par {locked.user.username}
          </AlertTitle>
          {locked.reason && (
            <Typography component="p">Raison: {locked.reason}</Typography>
          )}
        </Styled.LockedMessage>
      )}
    </Styled.Wrapper>
  );
};
