import {
  createConnection,
  Connection,
  Model
} from 'mongoose';
import blogSchema, { BlogInterface } from './blog';
import connectionOptions from '../configs/databaseConnection';
import userSchema, { UserInterface } from './users';

const conn: Connection = createConnection(`${connectionOptions.databaseString()}`, connectionOptions.options);

export const blogModel: Model<BlogInterface> = blogSchema(conn);
export const userModel: Model<UserInterface> = userSchema(conn);

conn.once('open', (): void => console.log('db connection open'));
