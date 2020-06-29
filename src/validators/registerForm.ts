import validator from 'validator';

export const registerFormValidation = ({
  username,
  password,
  confirmPassword,
  email,
  avatar,
}) => {
  const errors: any = {};

  const usernameFiltered = username ? username.trim() : username;
  const passwordFiltered = password ? password.trim() : password;
  const confirmPasswordFiltered = confirmPassword
    ? confirmPassword.trim()
    : confirmPassword;
  const emailFiltered = email ? email.trim() : email;

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
    if (passwordFiltered.includes(' ')) {
      errors.password = "Le mot de passe ne doit pas contenir d'espace";
    }
    if (passwordFiltered.length < 8) {
      errors.password = 'Le mot de passe est trop court';
    }
    if (passwordFiltered.length > 24) {
      errors.password = 'Le mot de passe est trop long';
    }
  } else {
    errors.password = 'Le mot de passe ne doit pas être vide';
  }

  if (passwordFiltered !== confirmPasswordFiltered) {
    errors.confirmPassword = 'Les mots de passes ne correspondent pas';
  }

  if (emailFiltered) {
    if (!validator.isEmail(emailFiltered)) {
      errors.email = "L'adresse e-mail n'est pas valide";
    }
  } else {
    errors.email = "L'adresse e-mail ne doit pas être vide";
  }

  if (avatar && avatar[0]) {
    if (avatar[0].size > 50000) {
      errors.avatar = 'Le fichier est trop volumineux';
    }
  }

  return errors;
};
