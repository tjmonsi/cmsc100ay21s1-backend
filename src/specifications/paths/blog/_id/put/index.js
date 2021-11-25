export const put = {
  description: 'Update a blog post',
  operationId: 'updateBlog',
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
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            title: {
              type: 'string'
            },
            text: {
              type: 'string'
            }
          }
        }
      }
    }
  },
  responses: {
    200: {
      description: 'Update a blog post and return the blog data',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/BlogData'
          }
        }
      }
    }
  }
};
