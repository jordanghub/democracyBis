import React, { useEffect, useCallback } from 'react';
import { IInfiniteScrollProps } from './interface';
import { useSelector } from 'react-redux';
import { TState } from 'types/state';

export const InfiniteScroll = ({ handlePageChange }) => {
  const handleDocumentScroll = (evt: any) => {
    if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
      handlePageChange();
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleDocumentScroll);

    return () => document.removeEventListener('scroll', handleDocumentScroll);
  }, [handleDocumentScroll]);

  return null;
};
