import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 */
export async function getManyBlog (request) {
  const { query } = request;
  const { limit = 5 } = query;

  const { Blog } = models;

  const blogs = await Blog
    .find({})
    .limit(limit);

  return blogs;
}
