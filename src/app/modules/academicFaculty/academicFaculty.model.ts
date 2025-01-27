import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);
academicFacultySchema.pre('save', async function (next) {
  const isFacultyExist = await AcademicFaculty.findOne({
    name: this.name,
  });

  if (isFacultyExist) {
    throw new Error('Faculty is already exists !');
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
