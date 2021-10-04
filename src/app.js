// Require the framework and instantiate it
import fastify from 'fastify';
import openApiGlue from 'fastify-openapi-glue';
import swagger from 'fastify-swagger';
import sensible from 'fastify-sensible';
import { Service } from './services/index.js';
import { specification } from './specifications/index.js';
import { connect } from './utils/mongodb/index.js';

/**
 * This function starts the server
 *
 * @param {*} options
 * @returns {*}
 */
export async function server (options = { logger: true }) {
  const app = fastify(options);

  app.register(sensible);

  await connect();

  const service = new Service();

  const openApiOptions = {
    specification,
    service,
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

  return app;
}
