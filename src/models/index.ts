import {
  model
} from 'mongoose';
import blogSchema from './blog';
import userSchema from './users';

export const blogModel = model('blogs', blogSchema());
export const userModel = model('users', userSchema());
