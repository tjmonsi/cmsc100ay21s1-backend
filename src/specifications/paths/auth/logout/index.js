export const get = {
  description: 'Logout a user',
  operationId: 'logout',
  tags: [
    'Auth'
  ],
  responses: {
    200: {
      description: 'Logging out a user',
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
    },
    {
      bearerAuth: []
    }
  ]
};
