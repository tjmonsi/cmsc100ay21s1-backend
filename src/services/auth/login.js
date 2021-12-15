import bcrypt from 'bcrypt';
import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 * @param {*} request
 * @param {*} reply
 * @returns {*}
 */
export async function login (request, reply) {
  const { body } = request;
  const { username, password } = body;

  const { User } = models;

  const user = await User.findOne({ username }).exec();

  if (!user) {
    return reply.notFound();
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return reply.forbidden();
  }

  const token = this.app.jwt.sign({
    username
  });

  request.session.token = token;

  return {
    success: true,
    token,
    username
  };
}
