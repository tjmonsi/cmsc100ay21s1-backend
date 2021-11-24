export const put = {
  description: 'Update a user',
  operationId: 'updateUser',
  tags: [
    'User'
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
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            password: {
              type: 'string'
            },
            newPassword: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Update a user and return user data',
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
