import { getFormError } from 'appConstant/formErrors';
import { getFormFieldLabel } from 'appConstant/formFields';

export const getErrorFromConstraint = (errors) => {
  if (!errors) {
    return [];
  }

  if (!Array.isArray(errors)) {
    return [];
  }

  const errorsList = errors.map(
    (error) =>
      `${getFormFieldLabel(error.property)} ${getFormError(
        error.constraints[0],
      )}`,
  );

  return errorsList;
};
