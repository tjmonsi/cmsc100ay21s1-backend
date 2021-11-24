import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 */
export async function getUser (request, response) {
  const { params } = request;
  const { id: _id } = params;

  const { User } = models;

  const user = await User.findOne({ _id }).exec();

  if (!user) {
    return response.notFound('No user found');
  }

  return user;
}
