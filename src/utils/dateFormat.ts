const months = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];

const days = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];

export const threadHomepageDate = (dateVal: string | number) => {
  const date = new Date(dateVal);
  const day = date.getDay();

  const monthDayNumber = date.getDate();
  const month = date.getMonth();
  const hours = date.getHours();
  let minutes = date.getMinutes().toString();

  minutes = minutes.toString().length === 1 ? '0' + minutes : minutes;

  return `${days[day].toLowerCase()} ${monthDayNumber} ${
    months[month]
  } à ${hours}h${minutes}`.toLowerCase();
};
