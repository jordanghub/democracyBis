export const loginFormValidation = ({ username, password }) => {
  const errors: any = {};

  const usernameFiltered = username ? username.trim() : username;
  const passwordFiltered = password ? password.trim() : password;

  if (usernameFiltered) {
    if (usernameFiltered.length < 3) {
      errors.username = "Le nom d'utilisateur est trop court";
    }
    if (usernameFiltered.length > 12) {
      errors.username = "Le nom d'utilisateur est trop long";
    }
  } else {
    errors.username = "Le nom d'utilisateur ne doit pas être vide";
  }
  if (passwordFiltered) {
    if (passwordFiltered.length < 8) {
      errors.password = 'Le mot de passe est trop court';
    }
    if (passwordFiltered.length > 24) {
      errors.password = 'Le mot de passe est trop long';
    }
  } else {
    errors.password = 'Le mot de passe ne doit pas être vide';
  }

  return errors;
};
