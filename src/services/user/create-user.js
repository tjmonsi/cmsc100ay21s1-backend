import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 * @param {*} request
 * @param {*} reply
 * @returns {*}
 */
export async function createUser (request, reply) {
  const { body } = request;
  const { username, password } = body;

  const { User } = models;

  const user = new User({
    username,
    password
  });

  await user.save();

  const { _id } = user;

  return {
    _id,
    username
  };
}
