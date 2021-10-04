import mongoose from 'mongoose';
import { readFileSync } from 'fs';

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

  return mongoose;
};

export {
  mongoose
};
