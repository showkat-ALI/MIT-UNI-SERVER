import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;

  name: TUserName;

  email: string;
  contactNo: string;

  isDeleted: boolean;
};

export interface SuperAdminSchema extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}
