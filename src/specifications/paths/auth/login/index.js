export const post = {
  description: 'Login using post method',
  operationId: 'login',
  tags: [
    'Auth'
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
      description: 'Successful login',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              success: {
                type: 'string'
              },
              token: {
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
