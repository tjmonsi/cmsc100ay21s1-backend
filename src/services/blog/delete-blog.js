import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 */
export async function deleteBlog (request) {
  const { params, user } = request;
  const { username } = user;
  const { id: _id } = params;

  const { Blog } = models;

  await Blog.deleteOne({ _id, username });

  return {
    success: true
  };
}
