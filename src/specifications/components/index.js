export const components = {
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
