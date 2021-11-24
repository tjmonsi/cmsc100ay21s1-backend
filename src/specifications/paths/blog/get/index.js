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
        }
      }
    }
  },
  security: [
    {}
  ]
};
