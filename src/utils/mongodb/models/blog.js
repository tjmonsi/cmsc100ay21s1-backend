export const createBlogModel = (mongoose) => {
  const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    createDate: {
      type: Number
    },
    updateDate: {
      type: Number
    }
  });

  blogSchema.pre('save', async function () {
    const today = new Date();
    this.createDate = today.getTime();
    this.updateDate = today.getTime();
  });

  blogSchema.pre('updateOne', async function () {
    this.updateDate = new Date().getTime();
  });

  const Blog = mongoose.model('Blog', blogSchema);
  return Blog;
};
