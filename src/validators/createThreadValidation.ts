export const createThreadValidation = ({ title, content, categories }) => {
  const errors: any = {};

  const titleFiltered = title ? title.trim() : title;
  const contentFiltered = content ? content.trim() : content;

  if (titleFiltered) {
    if (titleFiltered.length < 10) {
      errors.title = 'Le titre doit faire 10 caractères minimum';
    }
    if (titleFiltered.length > 255) {
      errors.title = 'Le titre ne doit pas dépasser 255 caractères';
    }
  } else {
    errors.title = 'Le titre ne doit pas être vide';
  }
  if (contentFiltered) {
    if (contentFiltered.length < 10) {
      errors.content = 'Le contenu doit faire 10 caractères minimum';
    }
  } else {
    errors.content = 'Le contenu ne doit pas être vide';
  }

  if (!categories) {
    errors.categories = 'Vous devez choisir au moins une catégorie';
  }
  if (Array.isArray(categories) && categories.length === 0) {
    errors.categories = 'Vous devez choisir au moins une catégorie';
  }
  return errors;
};
