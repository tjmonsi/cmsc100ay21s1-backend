/**
 * This is the home function
 *
 * @returns {*}
 */
export async function getCsrf (request, reply) {
  const { user } = request;
  const { username } = user || {};
  const token = await reply.generateCsrf();

  return {
    success: true,
    token,
    username
  };
}
