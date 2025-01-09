import { TAcademicSemester } from '../../academicSemester/academicSemester.interface';
import { User } from '../user.model';
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  const currentID = (await findLastStudentId()) || (0).toString();
  let incrementId = (Number(currentID) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
