import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 * @param {*} request
 * @param {*} reply
 * @returns {*}
 */
export async function updateBlog (request, reply) {
  const { body, params, user } = request;
  const { title, text } = body;
  const { id: _id } = params;
  const { username } = user;

  const { Blog } = models;

  const blog = await Blog.findOneAndUpdate({ _id, username }, {
    title,
    text
  }, {
    new: true
  });

  if (!blog) {
    return reply.notFound();
  }

  return blog;
}
