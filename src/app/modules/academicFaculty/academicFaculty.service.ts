import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { AcademicFacultySearchableFields } from './academicFaculty.constant';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Faculty } from '../Faculty/faculty.model';

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
  const isFacultyExist = await AcademicFaculty.findOne({
    name: payload.name,
    academicDepartment: payload.academicDepartment,
  });

  if (isFacultyExist) {
    throw new Error('Faculty is already exists !');
  }
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDB = async (
  query: Record<string, unknown>,
) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .search(AcademicFacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  academicFacultyQuery.modelQuery.populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicSemester',
    },
  });

  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const assignAFacultyForAcademicFaculty = async (
  academicFacultyID: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const checkAcademicFaculty = await AcademicFaculty.findById({
      _id: academicFacultyID,
    });
    if (!checkAcademicFaculty) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "This Academic Faculty doesn't exist ",
      );
    }

    if (checkAcademicFaculty.assignedFaculty) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'This Academic Faculty already has an assigned faculty',
      );
    }

    const deletedFaculty = await AcademicFaculty.findByIdAndUpdate(
      { _id: academicFacultyID },
      { assignedFaculty: payload.assignedFaculty },
      { new: true, session },
    );
    const checkFaculty = await Faculty.findById({
      _id: payload.assignedFaculty,
    });
    if (!checkFaculty) {
      throw new AppError(httpStatus.BAD_REQUEST, "This Faculty doesn't exist ");
    }
    const updatedAcademicDepartment = await Faculty.findOneAndUpdate(
      { _id: payload.assignedFaculty },
      { isAssigned: true, assignedAcademicFaculty: academicFacultyID },
      { new: true, runValidators: true },
    );

    if (!updatedAcademicDepartment) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Add Admin');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedFaculty;
  } catch (err: unknown) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error((err as Error).message);
  }
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultiesFromDB,
  getSingleAcademicFacultyFromDB,
  updateAcademicFacultyIntoDB,
  assignAFacultyForAcademicFaculty,
};
