export const post = {
  description: 'Create a user',
  operationId: 'createUser',
  tags: [
    'User'
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string'
            },
            password: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Creates a user and return user data',
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
    {}
  ]
};
