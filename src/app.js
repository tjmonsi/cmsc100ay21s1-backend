// Require the framework and instantiate it
import fastify from 'fastify';
import cors from 'fastify-cors';
import jwt from 'fastify-jwt';
import cookie from 'fastify-cookie';
import session from 'fastify-session';
import openApiGlue from 'fastify-openapi-glue';
import swagger from 'fastify-swagger';
import sensible from 'fastify-sensible';
import { readFileSync } from 'fs';
import { Service } from './services/index.js';
import { Security } from './security/index.js';
import { specification } from './specifications/index.js';
import { connect } from './utils/mongodb/index.js';

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

  app.register(cors, {
    origin: true,
    credentials: true
  });

  // get both private and public key: https://mkjwk.org/
  // get keyfile from PRIVATE key
  // get keyfile.key.pub from PRIVATE key
  app.register(jwt, {
    secret: {
      private: readFileSync('./cert/keyfile', 'utf8'),
      public: readFileSync('./cert/keyfile.key.pub', 'utf8')
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
    secret: readFileSync('./cert/keyfile', 'utf8'),
    cookie: {
      secure: false,
      httpOnly: true
    },
    maxAge: 60 * 60
  });

  app.register(sensible);

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
