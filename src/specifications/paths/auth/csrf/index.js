export const get = {
  description: 'Get a CSRF Token',
  operationId: 'getCsrf',
  tags: [
    'Auth'
  ],
  responses: {
    200: {
      description: 'Get a CSRF Token',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean'
              },
              token: {
                type: 'string'
              },
              username: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
};
