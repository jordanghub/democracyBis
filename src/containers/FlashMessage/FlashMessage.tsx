import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from 'types/state';
import { Snackbar } from '@material-ui/core';
import { resetFlashMessage } from 'store/actions';
import { Alert } from '@material-ui/lab';

export const FlashMessage = () => {
  const dispatch = useDispatch();

  const flashMessage = useSelector((state: TState) => state.app.flashMessage);

  const resetFlashMessageAction = useCallback(
    () => dispatch(resetFlashMessage()),
    [dispatch],
  );

  const handleClose = () => {
    resetFlashMessageAction();
  };
  return (
    <Snackbar
      open={!!flashMessage}
      autoHideDuration={10000}
      onClose={handleClose}
    >
      <Alert severity={flashMessage.type} variant="filled" elevation={6}>
        {flashMessage.message}
      </Alert>
    </Snackbar>
  );
};
