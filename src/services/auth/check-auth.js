/**
 * This is the home function
 *
 * @param {*} request
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
