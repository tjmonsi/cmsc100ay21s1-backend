// import { root } from './root/index.js';
import { blog } from './blog/index.js';
import { blogId } from './blog/_id/index.js';
import { user } from './user/index.js';
import { authLogin, authLogout, checkAuth } from './auth/index.js';

export const paths = {
  // '/': root,
  '/blog': blog,
  '/blog/:id': blogId,

  '/user': user,
  '/auth/login': authLogin,
  '/auth/logout': authLogout,
  '/auth/check-auth': checkAuth
};
