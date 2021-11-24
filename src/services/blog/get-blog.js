import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 */
export async function getBlog (request, response) {
  const { params } = request;
  const { id: _id } = params;

  const { Blog } = models;

  const blog = await Blog.findOne({ _id }).exec();

  if (!blog) {
    return response.notFound('No Blog found');
  }

  return blog;
}
