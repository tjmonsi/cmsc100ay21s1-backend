import { post } from './login/index.js';
import { get } from './logout/index.js';
import { get as getCsrf } from './csrf/index.js';
import { get as checkCsrf } from './check/index.js';

export const authLogin = {
  post
};

export const authLogout = {
  get
};

export const authGetCsrf = {
  get: getCsrf
};

export const authCheckCsrf = {
  get: checkCsrf
};
