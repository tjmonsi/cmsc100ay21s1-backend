export const createBlogModel = (mongoose) => {
  const blogSchema = new mongoose.Schema({
    title: String,
    text: String
  });
  const Blog = mongoose.model('Blog', blogSchema);
  return Blog;
};
