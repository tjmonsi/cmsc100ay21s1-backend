export const get = {
  description: 'Get a blog post',
  operationId: 'getBlog',
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
      description: 'Get a blog post and return the blog data',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/BlogData'
          }
        }
      }
    },
    404: {
      description: 'Blog is not found',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              statusCode: {
                type: 'number'
              },
              error: {
                type: 'string'
              },
              message: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  }
};
