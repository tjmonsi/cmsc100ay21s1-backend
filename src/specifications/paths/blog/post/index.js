export const post = {
  description: 'Create a blog post',
  operationId: 'createBlog',
  tags: [
    'Blog'
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
      description: 'Creates a blog post and return the blog data',
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
