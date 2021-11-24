export const createBlogModel = (mongoose) => {
  const blogSchema = new mongoose.Schema({
    title: String,
    text: String,
    username: String,
    createDate: {
      type: Number
    },
    updateDate: {
      type: Number
    }
  });

  blogSchema.pre('save', async function () {
    const date = new Date();
    this.createDate = date.getTime();
    this.updateDate = date.getTime();
  });

  blogSchema.pre('updateOne', async function () {
    const date = new Date();
    this.updateDate = date.getTime();
  });

  const Blog = mongoose.model('Blog', blogSchema);
  return Blog;
};
