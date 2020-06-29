import React from 'react';
import * as Styled from './ThreadHomepage.style';
import { ThreadHomepageProps } from './interface';
import { Grid, Zoom } from '@material-ui/core';
import { LinkComponent } from 'components/Utils';
import { Rating } from 'containers';
import { threadHomepageDate } from 'utils/dateFormat';
import { ThreadAvatar } from 'components/User';
import { CircleVotes } from 'components/CircleVotes';

import { ThreadLink } from 'components/Utils/ThreadLink';

export const ThreadHomepage = ({
  id,
  slug,
  title,
  withoutLink,
  author,
  date,
  categories,
  messageType,
  withAvatar = false,
  scoringCategories,
  votes,
}: ThreadHomepageProps) => {
  return (
    <Zoom in timeout={500} unmountOnExit>
      <Styled.Wrapper elevation={6} style={{ position: 'relative' }}>
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={11}>
            <Styled.Title variant="h6">
              {withoutLink ? (
                title
              ) : (
                <ThreadLink slug={slug as string}>{title}</ThreadLink>
              )}
            </Styled.Title>
            {withAvatar && (
              <ThreadAvatar
                avatarLink={author.avatarFileName}
                username={author.username}
                date={threadHomepageDate(date)}
              />
            )}

            <Styled.Categories>
              {categories?.map((category) => (
                <LinkComponent
                  key={category.id}
                  to={`/categories/[slug]`}
                  visibleLink={`/categories/${category.id}`}
                >
                  <Styled.ChipStyle component="span" label={category.name} />
                </LinkComponent>
              ))}
            </Styled.Categories>
          </Grid>
          <Grid item xs={1}>
            <Rating itemId={id} voteDisabled messageType={messageType} />
          </Grid>

          <CircleVotes votes={votes} scoringCategories={scoringCategories} />
        </Grid>
      </Styled.Wrapper>
    </Zoom>
  );
};
