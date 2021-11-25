export const components = {
  securitySchemes: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'sessionToken'
    },
    bearerAuth: {
      type: 'http',
      description: 'Simple bearer auth using JWT',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  },
  schemas: {
    BlogData: {
      type: 'object',
      properties: {
        _id: {
          type: 'string'
        },
        title: {
          type: 'string'
        },
        text: {
          type: 'string'
        },
        username: {
          type: 'string'
        },
        createDate: {
          type: 'number'
        },
        updateDate: {
          type: 'number'
        }
      }
    }
  }
};
