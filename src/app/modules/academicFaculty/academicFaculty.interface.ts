import { Types } from 'mongoose';

export type TAcademicFaculty = {
  name: string;
  academicDepartment: Types.ObjectId;
  assignedFaculty: Types.ObjectId;
};
