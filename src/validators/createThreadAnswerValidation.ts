export const createThreadAnswerValidation = ({ content }) => {
  const errors: any = {};

  const contentFiltered = content ? content.trim() : content;

  if (contentFiltered) {
    if (contentFiltered.length < 10) {
      errors.content = 'Le contenu doit faire 10 caractères minimum';
    }
  } else {
    errors.content = 'Le contenu ne doit pas être vide';
  }
  return errors;
};
