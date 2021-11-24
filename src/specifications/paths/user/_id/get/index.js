export const get = {
  description: 'Get a User',
  operationId: 'getUser',
  tags: [
    'Blog'
  ],
  parameters: [
    {
      name: 'id',
      in: 'path',
      schema: {
        type: 'string'
      },
      required: true
    }
  ],
  responses: {
    200: {
      description: 'Get a User and return the user data',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              _id: {
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
