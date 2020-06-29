import validator from 'validator';

export const editUserFormValidation = ({
  currentPassword,
  password,
  confirmPassword,
  email,
  avatar,
}) => {
  const errors: any = {};

  const passwordFiltered = password ? password.trim() : password;
  const confirmPasswordFiltered = confirmPassword
    ? confirmPassword.trim()
    : confirmPassword;
  const emailFiltered = email ? email.trim() : email;
  const currentPasswordFiltered = currentPassword
    ? currentPassword.trim()
    : currentPassword;

  if (currentPasswordFiltered) {
    if (currentPasswordFiltered.includes(' ')) {
      errors.currentPassword = "Le mot de passe ne doit pas contenir d'espace";
    }
    if (passwordFiltered === '') {
      errors.password = 'Le mot de passe ne doit pas être vide';
    }

    if (passwordFiltered === currentPasswordFiltered) {
      errors.password = 'Vous ne pouvez pas utiliser le même mot de passe';
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
  }

  if (
    currentPasswordFiltered &&
    confirmPasswordFiltered &&
    passwordFiltered &&
    passwordFiltered !== confirmPasswordFiltered
  ) {
    errors.confirmPassword = 'Les mots de passes ne correspondent pas';
    errors.password = 'Les mots de passes ne correspondent pas';
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
