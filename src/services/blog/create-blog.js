import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 * @param {*} request
 * @param {*} reply
 * @returns {*}
 */
export async function createBlog (request, reply) {
  const { body, user } = request;
  const { title, text } = body;
  const { username } = user;

  const { Blog } = models;

  const blog = new Blog({
    title,
    text,
    username
  });

  await blog.save();

  const { _id } = blog;

  return {
    _id,
    title,
    text,
    username
  };
}
