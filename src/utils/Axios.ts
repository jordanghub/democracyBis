import axios from 'axios';
import { Store } from 'redux';
import {
  changeisPageLoading,
  setFlashMessage,
  setAuthStatus,
  setUserToken,
} from 'store/actions';
import { BASE_API_URL, REFRESH_ENDPOINT } from 'appConstant/apiEndpoint';
import { logoutActions } from './logout';
import Router from 'next/router';
import cookies from 'js-cookie';
import cookiesBack from 'cookie';

let Axios = axios.create();

export const resetAxios = () => {
  Axios = axios.create();
};

export const getAxios = () => {
  return Axios;
};

const getTokens = (req) => {
  const isServer = typeof window === 'undefined';
  let refreshToken = null;
  let token = null;

  if (isServer && req && req.headers.cookie) {
    const cookiesList = cookiesBack.parse(req.headers.cookie);
    if (cookiesList) {
      if (cookiesList.token) {
        token = cookiesList.token;
      }
      if (cookiesList.refresh_token) {
        refreshToken = cookiesList.refresh_token;
      }
    }
  } else if (!isServer) {
    const tokenCookie = cookies.get('token');
    const refreshTokenCookies = cookies.get('refresh_token');

    if (tokenCookie) {
      token = tokenCookie;
    }
    if (refreshTokenCookies) {
      refreshToken = refreshTokenCookies;
    }
  }

  return {
    token,
    refreshToken,
  };
};

export const axiosInterceptors = (store: Store, res, req) => {
  resetAxios();
  const isServer = typeof window === 'undefined';

  const tokens = getTokens(req);

  let token = tokens.token;
  let refreshToken = tokens.refreshToken;

  const axiosInstance = getAxios();

  axiosInstance.interceptors.request.use(
    (config) => {
      if (!isServer) {
        const freshTokens = getTokens(req);

        if (freshTokens.token !== token) {
          token = freshTokens.token;
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (!(typeof window === 'undefined')) {
        store.dispatch(
          changeisPageLoading({
            status: true,
          }),
        );
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (!(typeof window === 'undefined')) {
        store.dispatch(
          changeisPageLoading({
            status: false,
          }),
        );
      }
      return response;
    },
    async (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 500: {
            store.dispatch(
              setFlashMessage({
                type: 'error',
                message: 'Une erreur est survenue sur le serveur',
              }),
            );
            break;
          }
          case 401: {
            const { type } = error?.response?.data;

            if (type) {
              break;
            }

            try {
              if (isServer && !refreshToken) {
                logoutActions(res);
                store.dispatch(setAuthStatus({ status: false }));
                return Promise.reject(new Error());
              }

              if (!isServer) {
                const freshTokens = getTokens(req);
                if (freshTokens.refreshToken) {
                  refreshToken = freshTokens.refreshToken;
                }
              }
              const cleanAxios = axios.create();

              const response = await cleanAxios.post(
                `${BASE_API_URL}${REFRESH_ENDPOINT}`,
                {
                  refresh_token: refreshToken,
                },
              );
              token = response.data.access_token;

              if (typeof window === 'undefined') {
                res.setHeader(
                  'Set-Cookie',
                  `token=${response.data.access_token};`,
                );
              } else {
                cookies.set('token', response.data.access_token);
              }
              store.dispatch(setUserToken({ token }));

              return axiosInstance.request(error.config);
            } catch (err) {
              logoutActions(res);
              store.dispatch(setAuthStatus({ status: false }));

              if (error.config.redirectOnFailure !== false) {
                store.dispatch(
                  setFlashMessage({
                    type: 'error',
                    message:
                      'Vous devez être connecté pour effectuer cette action',
                  }),
                );

                if (typeof window === 'undefined') {
                  logoutActions(res);
                  res.writeHead(302, { Location: '/login' });
                  res.end();
                } else {
                  Router.push('/login');
                }
              }

              return Promise.reject(new Error());
            }
            break;
          }
          case 403: {
            store.dispatch(
              setFlashMessage({
                type: 'error',
                message: "Vous n'êtes pas authorisé à effectuer cette action",
              }),
            );
            break;
          }
        }
      } else {
        store.dispatch(
          setFlashMessage({
            type: 'error',
            message: 'Une erreur est survenue sur le serveur',
          }),
        );
      }
      if (!(typeof window === 'undefined')) {
        store.dispatch(
          changeisPageLoading({
            status: false,
          }),
        );
      }
      return Promise.reject(error);
    },
  );
};

export default getAxios();
