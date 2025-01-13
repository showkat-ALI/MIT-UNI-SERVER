// year semesterCode 4digit number
import { AcademicFaculty } from '../../academicFaculty/academicFaculty.model';
import { TAcademicSemester } from '../../academicSemester/academicSemester.interface';

const findLastStudentId = async () => {
  const lastFaculty = await AcademicFaculty.findOne({
    id: 1,
    _id: 0,
  })
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastFaculty?.id ? lastFaculty.id : undefined;
};

export const generateAdminId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  const lastStudentId = await findLastStudentId();
  let currentId = (0).toString();

  const lastStudentYear = lastStudentId?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
