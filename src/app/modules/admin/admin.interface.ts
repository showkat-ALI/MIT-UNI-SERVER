import { Types } from 'mongoose';

export type TAdmin = {
  id: string;
  AcademicFaculty: Types.ObjectId;
};
