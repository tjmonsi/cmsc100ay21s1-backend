import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 */
export async function deleteBlog (request, reply) {
  const { params, user } = request;
  const { id: _id } = params;
  const { username } = user;

  const { Blog } = models;

  const blog = await Blog.deleteOne({ _id, username });

  if (blog.deletedCount === 0) {
    return reply.notFound();
  }

  return {
    success: true
  };
}
