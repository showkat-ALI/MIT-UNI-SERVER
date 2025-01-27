import { Types } from 'mongoose';

export type TAcademicDepartment = {
  name: string;
  academicFaculty: Types.ObjectId;
  academicSemester: Types.ObjectId;
  assignedAdmin: Types.ObjectId;
};
