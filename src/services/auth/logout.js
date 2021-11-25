import { models } from '../../utils/mongodb/index.js';

/**
 * This is the home function
 *
 * @param {*} request
 * @param {*} reply
 * @returns {*}
 */
export async function logout (request, reply) {
  const { token, user } = request;
  const { DiscardedToken } = models;

  const { username } = user;
  const data = new DiscardedToken({
    username,
    token
  });

  await data.save();

  request.destroySession(() => {
    reply.send({
      success: true
    });
  });
}
