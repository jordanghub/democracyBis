import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TState } from 'types/state';
import { resetPaginationData } from 'store/actions';

export const usePagination = (key: string, changePageCallback: any) => {
  const dispatch = useDispatch();

  const paginationData = useSelector((state: TState) => state.pagination[key]);

  const [isLoading, changeIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(
        resetPaginationData({
          key,
        }),
      );
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      changeIsLoading(false);
    }
  }, [paginationData]);

  const handlePageChange = useCallback(() => {
    if (isLoading) {
      return;
    }

    if (
      paginationData &&
      paginationData.currentPage + 1 <= paginationData.pages
    ) {
      changeIsLoading(true);
      changePageCallback({ page: paginationData.currentPage + 1 });
    }
  }, [paginationData, isLoading]);

  return {
    isLoading,
    changeIsLoading,
    handlePageChange,
    paginationData,
  };
};
