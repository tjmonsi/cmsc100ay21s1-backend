import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 * @param {*} request
 * @param {*} reply
 * @returns {*}
 */
export async function updateBlog (request, reply) {
  const { body, params } = request;
  const { title, text } = body;
  const { id: _id } = params;

  const { Blog } = models;

  const blog = await Blog.findOneAndUpdate({ _id }, {
    title,
    text
  });

  if (!blog) {
    return reply.notFound();
  }

  return {
    _id,
    title,
    text
  };
}
