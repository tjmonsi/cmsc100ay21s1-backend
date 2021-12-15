export const get = {
  description: 'Check authentication of a user',
  operationId: 'checkAuth',
  tags: [
    'Auth'
  ],
  responses: {
    200: {
      description: 'Check authentication of a user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'boolean'
              },
              username: {
                type: 'string'
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
    },
    {
      bearerAuth: []
    }
  ]
};
