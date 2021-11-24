import bcrypt from 'bcrypt';

export const createUserModel = (mongoose) => {
  const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  });

  async function updatePassword () {
    this.password = await bcrypt.hash(this.password, 10);
  }

  userSchema.pre('save', updatePassword);
  userSchema.pre('updateOne', updatePassword);

  const User = mongoose.model('User', userSchema);
  return User;
};
