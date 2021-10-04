import { root } from './root/index.js';
import { blog } from './blog/index.js';
import { blogId } from './blog/_id/index.js';

export const paths = {
  '/': root,
  '/blog': blog,
  '/blog/:id': blogId
};
