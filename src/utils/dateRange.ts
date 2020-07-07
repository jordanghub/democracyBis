export const dateSinceNow = (strDate: string) => {
  const createdAt = new Date(strDate);

  const currentDate = new Date();

  const difference = currentDate.getTime() - createdAt.getTime();

  const seconds = difference / 1000;

  if (seconds < 60) {
    return `Il y a ${Math.floor(seconds)} seconde${seconds > 0 ? 's' : ''}`;
  }

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  if (seconds < 86400) {
    const hours = Math.floor(seconds / 60 / 60);
    return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  }

  const daysSince = Math.floor(seconds / 86400);

  return `Il y a ${Math.floor(seconds / 86400)} jour${
    daysSince > 1 ? 's' : ''
  }`;
};
