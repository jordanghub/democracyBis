import nextCookie from 'next-cookies';

export const onlyAnonymousPage = (ctx) => {
  const token = getToken(ctx);

  if (token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    }
    return token;
  }
};

export const getToken = (ctx) => {
  const { token } = nextCookie(ctx);
  return token;
};

export const checkAuthServ = (ctx) => {
  const token = getToken(ctx);

  // The user is not logged in
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }

    return token;
  }
};
