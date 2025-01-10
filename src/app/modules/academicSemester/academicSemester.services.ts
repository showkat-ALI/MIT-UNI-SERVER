import { academicSemesterNameCodeMapper } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  // semester name --> semester code
  // academicSemesterNameCodeMapper['Fall']

  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};
const getSingleAcademicSemesterFromDB = async (id: any) => {
  // const newID = new ObjectId
  const result = await AcademicSemester.findById({ _id: id });
  return result;
};
const updateSingleAcademicSemesterFromDB = async (
  academicId: string,
  payload: TAcademicSemester,
) => {
  const Academic = await AcademicSemester.findOne({ _id: academicId });
  const result = await AcademicSemester.findByIdAndUpdate(
    Academic?._id,
    payload,
    {
      new: true,
      runValidators: true,
    },
  ); // Return the updated document runValidators: true // Ensure the update adheres to schema validation });
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
