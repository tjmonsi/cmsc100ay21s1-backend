import bcrypt from 'bcrypt';
import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 * @param {*} request
 * @param {*} reply
 * @returns {*}
 */
export async function updateUser (request, reply) {
  const { body, params } = request;
  const { password, newPassword } = body;
  const { id: _id } = params;

  const { User } = models;

  // check password here
  const oldUser = await User.findOne({ _id }).exec();

  if (await !bcrypt.compare(password, oldUser.password)) {
    return reply.forbidden();
  }

  const user = await User.findOneAndUpdate({ _id }, {
    password: newPassword
  });

  if (!user) {
    return reply.notFound();
  }

  return {
    success: true
  };
}
