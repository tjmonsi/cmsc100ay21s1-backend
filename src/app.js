// Require the framework and instantiate it
import fastify from 'fastify';
import stat from 'fastify-static';
import jwt from 'fastify-jwt';
import cookie from 'fastify-cookie';
import session from 'fastify-session';
import csrf from 'fastify-csrf';
import openApiGlue from 'fastify-openapi-glue';
import swagger from 'fastify-swagger';
import sensible from 'fastify-sensible';
import { Service } from './services/index.js';
import { Security } from './security/index.js';
import { specification } from './specifications/index.js';
import { connect } from './utils/mongodb/index.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const audience = 'this-audience';
const issuer = 'localhost';

/**
 * This function starts the server
 *
 * @param {*} options
 * @returns {*}
 */
export async function server (options = { logger: true }) {
  const app = fastify(options);

  app.register(sensible);

  app.register(stat, {
    root: join(dirname(fileURLToPath(import.meta.url)), './public'),
    preCompressed: true
  });

  app.setNotFoundHandler((_req, res) => {
    return res.sendFile('index.html');
  });

  app.register(jwt, {
    secret: {
      private: readFileSync('./cert/private.key', 'utf8'),
      public: readFileSync('./cert/public.key', 'utf8')
    },
    sign: {
      algorithm: 'RS256',
      audience,
      issuer,
      expiresIn: '1h'
    },
    verify: {
      audience,
      issuer
    }
  });

  app.register(cookie);
  app.register(session, {
    cookieName: 'sessionToken',
    secret: readFileSync('./cert/private.key', 'utf8'),
    cookie: {
      secure: 'auto',
      httpOnly: true
    },
    maxAge: 60 * 60
  });
  app.register(csrf, { sessionPlugin: 'fastify-session' });

  await connect();

  const service = new Service(app);
  const securityHandlers = new Security(app);

  const openApiOptions = {
    specification,
    service,
    securityHandlers,
    noAdditional: true
  };

  const swaggerOptions = {
    // @ts-ignore
    openapi: specification,
    routePrefix: '/docs',
    exposeRoute: process.env.NODE_ENV !== 'production'
  };

  app.register(swagger, swaggerOptions);
  app.register(openApiGlue, openApiOptions);

  /**
   * app.get('/blog', service.getManyBlog)
   * app.get('/blog/:id', service.getBlog)
   */

  return app;
}
