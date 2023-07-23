import {
  Document,
  Schema,
  Model,
  Connection
} from 'mongoose';

export enum RoleEnum {
  ADMIN = 'admin',
  USER = 'user'
} 

export interface UserInterface extends Document {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: RoleEnum;
    created_at: Date;
    updated_at: Date;
}

export default function() {
  const userSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: RoleEnum, required: true }
  }, {
    timestamps: true
  });
  return userSchema;
}

// export default function factory(conn: Connection): Model<UserInterface> {
//   // @ts-ignore
//   return conn.model('users', userSchema);
// };
