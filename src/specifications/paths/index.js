import { root } from './root/index.js';
import { blog } from './blog/index.js';
import { blogId } from './blog/_id/index.js';
import { user } from './user/index.js';
import { userId } from './user/_id/index.js';
import { authLogin, authLogout } from './auth/index.js';

export const paths = {
  '/': root,
  '/blog': blog,
  '/blog/:id': blogId,

  '/user': user,
  '/user/:id': userId,
  '/auth/login': authLogin,
  '/auth/logout': authLogout
  // TODO: Create a TODO CRUD
  /**
   * '/todo' - GET, POST
   * '/todo/:id' - GET, PUT, UPDATE
   */
};
