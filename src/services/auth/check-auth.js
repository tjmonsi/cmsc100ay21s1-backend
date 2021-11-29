/**
 * This is the home function
 *
 * @returns {*}
 */
export async function checkAuth (request) {
  const { user } = request;
  const { username } = user;
  return {
    success: true,
    username
  };
}
