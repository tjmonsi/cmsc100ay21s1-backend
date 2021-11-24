export const get = {
  description: 'Logout using get method',
  operationId: 'logout',
  tags: [
    'Auth'
  ],
  responses: {
    200: {
      description: 'Successful logout',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
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
