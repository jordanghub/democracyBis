import React, { useState, useCallback, useRef } from 'react';

import RatingIcon from '@material-ui/icons/HowToVoteOutlined';
import * as Styled from './Rating.style';

import { IRatingProps } from './interface';
import { RatingTabs } from 'components/Rating/RatingTabs';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMessageVotes,
  fetchScoringCategories,
  fetchThreadVotes,
} from 'store/actions';
import { TState } from 'types/state';
import { ClickAwayListener, Grid } from '@material-ui/core';
import { Transition } from 'react-transition-group';

const ratingClosed = {
  isOpened: false,
  persist: false,
};

const ratingOpenedMouse = {
  isOpened: true,
  persist: false,
};

const ratingOpenedClick = {
  isOpened: true,
  persist: true,
};

const fadeDuration = 300;

export const Rating = ({ voteDisabled, messageType, itemId }: IRatingProps) => {
  const [isRatingOpen, changeisRatingOpen] = useState(ratingClosed);

  const ref = useRef<HTMLDivElement>(null);
  const popperRef = useRef(null);

  const dispatch = useDispatch();

  const fetchMessageVotesAction = useCallback(
    (payload) => dispatch(fetchMessageVotes(payload)),
    [dispatch],
  );
  const fetchScoringCategoriesAction = useCallback(
    () => dispatch(fetchScoringCategories()),
    [dispatch],
  );
  const fetchThreadVotesAction = useCallback(
    (payload) => dispatch(fetchThreadVotes(payload)),
    [dispatch],
  );

  const votes = useSelector(
    (state: TState) =>
      state.votes[messageType === 'thread' ? 'threads' : 'messages'],
  );

  const scoringCategories = useSelector(
    (state: TState) => state.votes.scoringCategories,
  );

  const isLoggedIn = useSelector((state: TState) => state.user.isLoggedIn);

  const handleRatingClose = () => {
    changeisRatingOpen(ratingClosed);
  };

  const handleIconClick = useCallback(() => {
    if (isRatingOpen.isOpened && isRatingOpen.persist) {
      changeisRatingOpen(ratingClosed);
    } else {
      changeisRatingOpen(ratingOpenedClick);
    }
  }, [isRatingOpen]);

  const handleMouseEnter = useCallback(() => {
    if (!isRatingOpen.isOpened) {
      changeisRatingOpen(ratingOpenedMouse);
    }
  }, [isRatingOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!isRatingOpen.persist) {
      changeisRatingOpen(ratingClosed);
    }
  }, [isRatingOpen]);

  return (
    <Styled.Wrapper
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ClickAwayListener onClickAway={handleRatingClose}>
        <Grid container justify="flex-end">
          <RatingIcon
            fontSize="large"
            cursor="pointer"
            onClick={handleIconClick}
          />
          <Transition
            in={isRatingOpen.isOpened || isRatingOpen.persist}
            timeout={{
              enter: fadeDuration,
              exit: fadeDuration,
            }}
            unmountOnExit
            exit
          >
            {(state) => (
              <Styled.PoperRating
                state={state}
                fadeDuration={fadeDuration}
                className="MuiTabsContainer"
                popperRef={popperRef}
                open
                anchorEl={ref.current}
                placement="bottom-end"
                disablePortal
                transition
                modifiers={{
                  flip: {
                    enabled: true,
                  },
                }}
              >
                <RatingTabs
                  handleClose={handleRatingClose}
                  itemId={itemId}
                  messageType={messageType}
                  voteDisabled={voteDisabled}
                  fetchScoringCategoriesAction={fetchScoringCategoriesAction}
                  fetchThreadVotesAction={fetchThreadVotesAction}
                  scoringCategories={scoringCategories}
                  fetchMessageVotesAction={fetchMessageVotesAction}
                  isLoggedIn={isLoggedIn}
                  votes={votes}
                />
              </Styled.PoperRating>
            )}
          </Transition>
        </Grid>
      </ClickAwayListener>
    </Styled.Wrapper>
  );
};
