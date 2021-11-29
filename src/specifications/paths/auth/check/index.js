export const get = {
  description: 'Check authentication',
  operationId: 'checkAuth',
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
              }
            }
          }
        }
      }
    }
  },
  security: [
    {
      cookieAuth: []
    }
  ]
};
