import { useCallback, useEffect } from 'react';

export const useInfiniteScroll = (
  element: any,
  handleBottomReached: any,
  useDocument = false,
) => {
  const handleDocumentScroll = useCallback(
    (evt: any) => {
      if (window.innerHeight + window.scrollY === document.body.scrollHeight) {
        handleBottomReached();
      }
    },
    [handleBottomReached],
  );

  const handleItemScroll = useCallback(
    (evt: any) => {
      const sizes = evt.target.getBoundingClientRect();

      if (evt.target.scrollHeight === sizes.height + evt.target.scrollTop) {
        handleBottomReached();
      }
    },
    [handleBottomReached],
  );

  useEffect(() => {
    if (element) {
      element.addEventListener('scroll', handleItemScroll);

      return () => element.removeEventListener('scroll', handleItemScroll);
    } else if (useDocument) {
      document.addEventListener('scroll', handleDocumentScroll);

      return () => document.removeEventListener('scroll', handleDocumentScroll);
    }
  }, [handleDocumentScroll, handleItemScroll]);
};
