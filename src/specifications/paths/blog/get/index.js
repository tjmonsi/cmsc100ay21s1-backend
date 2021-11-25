export const get = {
  description: 'Get all blog post',
  operationId: 'getManyBlog',
  tags: [
    'Blog'
  ],
  parameters: [
    {
      name: 'limit',
      in: 'query',
      schema: {
        type: 'number'
      }
    }
  ],
  responses: {
    200: {
      description: 'Get many blog posts and return the blog data',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/BlogData'
            }
          }
        }
      }
    }
  }
};
