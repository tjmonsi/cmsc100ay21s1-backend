import { home } from './base/home.js';
import { createBlog } from './blog/create-blog.js';
import { getBlog } from './blog/get-blog.js';
import { getManyBlog } from './blog/get-many-blog.js';
import { updateBlog } from './blog/update-blog.js';
import { deleteBlog } from './blog/delete-blog.js';

import { createUser } from './user/create-user.js';
import { updateUser } from './user/update-user.js';
import { getUser } from './user/get-user.js';

import { login } from './auth/login.js';
import { logout } from './auth/logout.js';

export class Service {
  constructor (app) {
    this.app = app;
  }

  home = home
  createBlog = createBlog
  getManyBlog = getManyBlog
  getBlog = getBlog
  updateBlog = updateBlog
  deleteBlog = deleteBlog

  createUser = createUser 
  updateUser = updateUser
  getUser = getUser 

  login = login
  logout = logout
}