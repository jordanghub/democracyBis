import React, { memo, useCallback, useEffect } from 'react';

import * as Styled from './RatingForm.style';
import { Typography, Slider, Button } from '@material-ui/core';
import { RatingFormProps } from './interface';
import { Field, Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { TState } from 'types/state';

import { scoringFormSubmit, fetchCurrentUserMessageVote } from 'store/actions';
import { AnyObject, FormApi } from 'final-form';
import { useForms } from 'hooks';

function valuetext(value: Number) {
  return `${value}`;
}

const SliderField = ({ name, criteria, disabled }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const handleSliderChange = (mouseEvent, value) => {
          input.onChange(value);
        };

        return (
          <div>
            <Typography gutterBottom>
              {criteria} ({input.value || 0})
            </Typography>

            <Slider
              disabled={disabled}
              value={input.value || 0}
              onChange={handleSliderChange}
              defaultValue={0}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={100}
            />
          </div>
        );
      }}
    </Field>
  );
};

const RatingFormComponent = ({ handleSubmit, messageId, disabled }) => {
  const categories = useSelector(
    (state: TState) => state.votes.scoringCategories,
  );

  const formData = useSelector(
    (state: TState) => state.forms.forms[`scoring${messageId}`],
  );

  const submitSuccess = formData && formData.submitSuccess;

  return (
    <>
      <form onSubmit={handleSubmit}>
        {categories.map((criteria) => (
          <div key={criteria.name}>
            <SliderField
              name={`criteria-${criteria.id}`}
              criteria={criteria.name}
              disabled={disabled}
            />
          </div>
        ))}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={submitSuccess}
        >
          Envoyer
        </Button>
      </form>
    </>
  );
};

const RatingFormElement = ({ messageId }) => {
  const { resetFormData } = useForms();
  const dispatch = useDispatch();

  const formSubmitAction = useCallback(
    (payload) => dispatch(scoringFormSubmit(payload)),
    [dispatch],
  );

  const getUserVoteAction = useCallback(
    (payload) => dispatch(fetchCurrentUserMessageVote(payload)),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      resetFormData({
        formName: `scoring${messageId}`,
      });
    };
  }, []);

  const votes = useSelector((state: TState) => state.votes.user);

  const item = votes.find((msgVote) => msgVote.id === messageId);

  const initialValues = {};

  item?.votes?.forEach((vote) => {
    initialValues[`criteria-${vote.categoryId}`] = vote.value;
  });

  useEffect(() => {
    getUserVoteAction({
      id: messageId,
    });
  }, []);

  const handleSubmit = (values: AnyObject, form: FormApi) => {
    formSubmitAction({
      id: messageId,
      votes: values,
    });
  };
  return (
    <>
      <Form
        initialValues={initialValues}
        render={(props) => (
          <RatingFormComponent
            {...props}
            messageId={messageId}
            disabled={false}
          />
        )}
        validate={validateForm}
        onSubmit={handleSubmit}
      />
    </>
  );
};

const validateForm = () => ({});

export const RatingForm = memo(({ votes, messageId }: RatingFormProps) => {
  return (
    <Styled.Wrapper>
      <RatingFormElement messageId={messageId} />
    </Styled.Wrapper>
  );
});
