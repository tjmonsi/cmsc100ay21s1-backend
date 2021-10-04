import { put } from './put/index.js';
import { get } from './get/index.js';
import { del } from './delete/index.js';

export const blogId = {
  get,
  put,
  delete: del
};
