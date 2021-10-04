import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 */
export async function deleteBlog (request) {
  const { params } = request;
  const { id: _id } = params;

  const { Blog } = models;

  await Blog.deleteOne({ _id });

  return {
    success: true
  };
}
