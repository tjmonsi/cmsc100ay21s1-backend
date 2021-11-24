export const createDiscardedTokenModel = (mongoose) => {
  const discardedTokenSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  });

  const DiscardedToken = mongoose.model('DiscardedToken', discardedTokenSchema);
  return DiscardedToken;
};
