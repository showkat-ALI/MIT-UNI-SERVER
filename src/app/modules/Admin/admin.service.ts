/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model';
const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
};
const assignAnAdminIntoDept = async (
  id: string,
  payload: { academicDepartment: mongoose.Types.ObjectId },
) => {
  const admin = await Admin.findById(id);
  const academicDepartment = await AcademicDepartment.findById({
    _id: payload.academicDepartment,
  });
  if (!admin) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admin not found');
  }

  if (admin.assignedDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Admin is already assigned to a department',
    );
  }
  if (academicDepartment?.assignedAdmin) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This department has Already a Admin',
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: id },
      { assignedDepartment: payload.academicDepartment },
      { new: true, runValidators: true },
    );

    if (!updatedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Assign Admin');
    }

    const updatedAcademicDepartment = await AcademicDepartment.findOneAndUpdate(
      { _id: payload.academicDepartment },
      { assignedAdmin: id },
      { new: true, runValidators: true },
    );

    if (!updatedAcademicDepartment) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Add Admin');
    }
    await session.commitTransaction();
    await session.endSession();

    return updatedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};
const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id);
  return result;
};

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user;

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  assignAnAdminIntoDept,
};
