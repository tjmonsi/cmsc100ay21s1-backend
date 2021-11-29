import { models } from '../utils/mongodb/index.js';

/**
 *
 * @param {*} request
 * @param {*} reply
 * @param {*} app
 */
async function auth (request, reply, app) {
  const { headers, session } = request;
  const { authorization } = headers;
  const { token: sessionToken } = session;
  const { User, DiscardedToken } = models;

  let authorizationToken;

  if (!authorization && !sessionToken) {
    return reply.unauthorized();
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
      return reply.unauthorized('auth/discarded');
    }

    // when using cookie that needs to check Csrf
    if (sessionToken) {
      const csrfProtection = () => new Promise((resolve) => {
        app.csrfProtection(request, reply, resolve);
      });
      await csrfProtection();
    }

    const user = await User.findOne({ username }).exec();

    if (!user) {
      return reply.unauthorized('auth/no-user');
    }

    // save the user and token here
    request.user = user;
    request.token = token;
  } catch (error) {
    console.error(error);

    if (error.message === 'jwt expired') {
      return reply.unauthorized('auth/expired');
    }

    return reply.unauthorized('auth/unauthorized');
  }
}

export class Security {
  constructor (app) {
    this.app = app;
  }

  /**
  * @param {*} request
  * @param {*} response
  */
  async cookieAuth (request, response) {
    console.log('cookie');
    await auth(request, response, this.app);
  }

  /**
  * @param {*} request
  * @param {*} response
  */
  async bearerAuth (request, response) {
    await auth(request, response, this.app);
  }

  async csrfAuth (request, response) {
    const csrfProtection = () => new Promise((resolve) => {
      this.app.csrfProtection(request, response, resolve);
    });
    await csrfProtection();
  }
}
