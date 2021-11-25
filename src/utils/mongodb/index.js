import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { createBlogModel } from './models/blog.js';
import { createUserModel } from './models/user.js';

const models = {};

export const connect = async () => {
  const userPass = readFileSync('config/dev.json', 'utf8');

  /**
   * const obj = JSON.parse(userPass)
   * const mongodb = obj.mongodb
   * const username = mongodb.username
   * const password = mongodb.password
   */
  const { mongodb: { username, password } } = JSON.parse(userPass);

  const config = readFileSync('src/config.json', 'utf8');
  const { mongodb: { host, database } } = JSON.parse(config);

  await mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`);

  console.log('mongodb connected');

  models.Blog = createBlogModel(mongoose);
  models.User = createUserModel(mongoose);

  return mongoose;
};

export {
  mongoose,
  models
};
