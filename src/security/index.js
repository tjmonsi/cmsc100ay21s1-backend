import { models } from '../utils/mongodb/index.js';

/**
* @param {*} request
* @param {*} response
*/
const auth = async (request, response, app) => {
  const { headers, session } = request;
  const { authorization } = headers;
  const { token: sessionToken } = session;
  const { User, DiscardedToken } = models;

  let authorizationToken;

  if (!authorization && !sessionToken) {
    return response.unauthorized('auth/no-authorization-header');
  }

  if (authorization) {
    // expecting to have the authorization to be "Bearer [token]"
    // that means if we split it, we create '' (Bearer ) 'token'
    // then we just get the second element of that array
    [, authorizationToken] = authorization.split('Bearer ');
  }

  const token = authorizationToken || sessionToken;

  try {
    await app.jwt.verify(token);
    const { username } = app.jwt.decode(token);

    const discarded = await DiscardedToken.findOne({ username, token }).exec();

    if (discarded) {
      return response.unauthorized('auth/discarded');
    }

    const user = await User.findOne({ username }).exec();

    if (!user) {
      return response.unauthorized('auth/no-user');
    }

    // save the user and token here
    request.user = user;
    request.token = token;
  } catch (error) {
    console.error(error);

    if (error.message === 'jwt expired') {
      return response.unauthorized('auth/expired');
    }
    return response.unauthorized('auth/unauthorized');
  }
};

export class Security {
  constructor (app) {
    this.app = app;
  }

  /**
  * @param {*} request
  * @param {*} response
  */
  async cookieAuth (request, response) {
    await auth(request, response, this.app);
  }

  /**
  * @param {*} request
  * @param {*} response
  */
  async bearerAuth (request, response) {
    await auth(request, response, this.app);
  }
}
