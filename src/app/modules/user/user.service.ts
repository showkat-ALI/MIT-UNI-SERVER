/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generatedFacultyID, generateStudentId } from './utils/user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { TFaculty } from '../faculty/faculty.interface';
import { Faculty } from '../faculty/faculty.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //set manually generated it
  const getSingleAcademicSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  const session = await mongoose.startSession();
  // create a user
  try {
    session.startTransaction();
    userData.id = await generateStudentId(
      getSingleAcademicSemester as TAcademicSemester,
    );

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    //create a student
    if (Object.keys(newUser).length) {
      // set id , _id as user
      studentData.id = newUser[0].id;
      studentData.user = newUser[0]._id; //reference _id

      const newStudent = await Student.create([studentData], { session });
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
      }
      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    }
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};
const createFacultyIntoDB = async (password: string, payLoad: TFaculty) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);
  userData.role = 'faculty';
  const academicDepartment = await AcademicDepartment.findById(
    payLoad.academicDepartment,
  );
  if (!academicDepartment) {
    throw new AppError(400, 'Academic Department Not Found');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    userData.id = await generatedFacultyID();
    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to create user');
    }
    //create a student
    if (Object.keys(newUser).length) {
      // set id , _id as user
      payLoad.id = newUser[0].id;
      payLoad.user = newUser[0]._id; //reference _id
      const newFaculty = await Faculty.create([payLoad], { session });
      if (!newFaculty.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
      }
      await session.commitTransaction();
      await session.endSession();
      return newFaculty;
    }
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
};
