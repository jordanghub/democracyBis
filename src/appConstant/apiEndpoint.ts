/**
 * List of api endpoints
 */
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const BASE_API_URL = publicRuntimeConfig.API_URL;

export const USER_ENDPOINT = '/users';
export const THREAD_LIST_ROUTE = '/threads';
export const CATEGORY_ENDPOINT = '/categories';
export const SEARCH_THREAD_ENDPOINT = '/search/threads';

export const CATEGORIES_ENDPOINT = '/categories';
export const CURRENT_USER_ENDPOINT = `${USER_ENDPOINT}/me`;
export const REGISTER_ENDPOINT = `${USER_ENDPOINT}/register`;
export const LOGIN_ENDPOINT = '/auth/login';
export const REFRESH_ENDPOINT = '/auth/refresh';
export const MESSAGES_ENDPOINT = '/messages';
export const SCORING_ENDPOINT = '/scoring';

export const WEBSOCKET_GATEWAY = '192.168.1.22:3000';

export const EMAIL_VALIDATION = `${USER_ENDPOINT}/email-validation`;
export const RESEND_VALIDATION_EMAIL = `${USER_ENDPOINT}/resend-validation-email`;

export const AVATAR_ENDPOINT = '/avatars';
