import {
  Schema,
  Connection,
  Document,
  Model
} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';
export enum DriverStatus {
  ACTIVE = 'active',
  DEACTIVATED='deactivated',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive'
}

export interface DriverInterface {
  name: string;
  email: string;
  phoneNumber: string;
  licenseNumber: string;
  carNumber: string;
  isVerified: boolean;
  status: DriverStatus;
  location?: string;
}

export interface BlogInterface extends Document{
  id: string;
  title: string;
  content: string;
  author: Schema.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}

export const blogSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {type: Schema.Types.ObjectId, ref: 'users'},
}, {
  timestamps: true
});
blogSchema.plugin(mongoosePaginate);

export default function factory(conn: Connection): Model<BlogInterface> {
  // @ts-ignore
  return conn.model('blogs', blogSchema);
}
