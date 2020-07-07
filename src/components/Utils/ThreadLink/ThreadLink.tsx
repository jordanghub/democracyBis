import React, { memo } from 'react';
import { useRouter } from 'next/router';
import { useThread } from 'hooks';

import * as Styled from './ThreadLink.style';

interface IThreadLink {
  slug: string;
  children: any;
}

// const urlFromQuery = (query, route): string => {
//   const queryParams = Object.entries(query);

//   let url = route;

//   queryParams.forEach((item) => {
//     url = url.replace(`[${item[0]}]`, item[1]);
//   });

//   return url;
// };

export const ThreadLink = memo(({ slug, children }: IThreadLink) => {
  const { fetchThreadSingle } = useThread();

  const router = useRouter();

  const handleClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();

    fetchThreadSingle({ id: slug });
    history.pushState(null, null, `/thread/${slug}`);
  };

  return (
    <Styled.Wrapper
      onClick={handleClick}
      href={`/thread/${slug}`}
      className="thread-link"
    >
      {children}
    </Styled.Wrapper>
  );
});
