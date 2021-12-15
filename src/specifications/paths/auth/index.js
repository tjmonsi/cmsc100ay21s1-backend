import { post } from './login/index.js';
import { get } from './logout/index.js';
import { get as getCheckAuth } from './check-auth/index.js'

export const authLogin = {
  post
};

export const authLogout = {
  get
};

export const checkAuth = {
  get: getCheckAuth
}
