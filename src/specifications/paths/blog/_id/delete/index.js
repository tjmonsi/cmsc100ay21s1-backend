export const del = {
  description: 'Delete a blog post',
  operationId: 'deleteBlog',
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
      description: 'Delete a blog post',
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
  }
};
