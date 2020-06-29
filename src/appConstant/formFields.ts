const formFields = {
  username: "Le nom d'utilisateur",
  password: "Le mot de passe",
  email: "L'adresse e-mail",

  title: "Le titre",
  content: "Le message",
  message: "Le message",
  categories: "Les catégories",
  sources: "Les sources",
  selectedText: "La selection",
  avatar: "L'avatar",
}

export const getFormFieldLabel = (key, locale = "fr") => {
  return formFields[key] || "no_field_label";
}