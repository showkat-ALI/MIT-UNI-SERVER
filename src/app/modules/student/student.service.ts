import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id } }]);
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },

      { isDeleted: true },
      { new: true, session },
    );
    const deletedUser = await User.findOneAndUpdate(
      { id },

      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete student');
    }

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete User');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (error) {
    await session.abortTransaction();

    await session.endSession();
    throw new Error(' Failed to delete a Student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
