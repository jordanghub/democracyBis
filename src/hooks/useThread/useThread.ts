import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from 'types/state';
import {
  addNewThreadMessage,
  clearThreadSingle,
  fetchThreadSingle,
  changeLatestThreads,
  fetchLatestThreads,
} from 'store/actions';

export const useThread = () => {
  const dispatch = useDispatch();

  const thread = useSelector((state: TState) => state.thread);

  const fethLatestThreadsAction = useCallback(
    (payload) => dispatch(fetchLatestThreads(payload)),
    [dispatch],
  );

  const fetchThreadSingleAction = useCallback(
    (payload) => dispatch(fetchThreadSingle(payload)),
    [dispatch],
  );

  const addMessageAction = useCallback(
    (payload) => dispatch(addNewThreadMessage(payload)),
    [dispatch],
  );

  const clearThreadAction = useCallback(() => dispatch(clearThreadSingle()), [
    dispatch,
  ]);

  const clearLatestThreadsAction = useCallback(
    () => dispatch(changeLatestThreads({ threads: null })),
    [dispatch],
  );

  return useMemo(
    () => ({
      thread,
      addNewThreadMessage: addMessageAction,
      clearThreadSingle: clearThreadAction,
      fetchThreadSingle: fetchThreadSingleAction,
      clearLatestThreads: clearLatestThreadsAction,
      fetchLatestThreads: fethLatestThreadsAction,
    }),
    [
      thread,
      addMessageAction,
      clearThreadAction,
      fetchThreadSingleAction,
      clearLatestThreadsAction,
      fethLatestThreadsAction,
    ],
  );
};
