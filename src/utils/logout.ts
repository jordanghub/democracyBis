import cookies from 'js-cookie';

export const logoutActions = (res) => {
  const time = new Date();
  time.setTime(time.getTime() - 500);

  if (typeof window === 'undefined' && res) {
    res.setHeader('Set-Cookie', [
      `token=; Expires=${time.toUTCString()};`,
      `refresh_token=; Expires=${time.toUTCString()};`,
    ]);
  } else {
    cookies.remove('token');
    cookies.remove('refresh_token');
  }
};
