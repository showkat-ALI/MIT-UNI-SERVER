import httpStatus from 'http-status';
import fs from 'fs';
import AppError from '../../errors/AppError';
interface UploadedFile {
  path: string;
  originalname: string;
}

import { Request } from 'express';
import { Assignment } from './assignments.model';
import { minioClient } from '../../minio-config/minioConfig';

const createAssignmentFileIntoDB = async (req: Request) => {
  const bucketname = 'think-trail-bucket';

  const checkMinioConnection = async (): Promise<void> => {
    try {
      await minioClient.bucketExists(bucketname);
    } catch (error) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        'MinIO is not connected',
      );
    }
  };

  const uploadFileToMinIO = async (file: UploadedFile): Promise<string> => {
    const fileStream = fs.createReadStream(file.path);
    const bucketName = bucketname; // Replace with your bucket name
    const objectName = `${Date.now()}_${file.originalname}`; // Unique file name

    await minioClient.putObject(bucketName, objectName, fileStream);

    // Generate a pre-signed URL for the file (valid for 7 days)
    const fileUrl = await minioClient.presignedUrl(
      'GET',
      bucketName,
      objectName,
      7 * 24 * 60 * 60,
    );

    return fileUrl;
  };

  try {
    await checkMinioConnection();
    if (!req.file) {
      throw new AppError(httpStatus.BAD_REQUEST, 'No file uploaded');
    }
    const fileUrl = await uploadFileToMinIO(req.file as UploadedFile);
    return { fileUrl };
  } catch (error) {
    console.log(error);

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error uploading assignment file',
    );
  }
};
const createAssignmentIntoDB = async (req: Request) => {
  const data = req.body;
  try {
    // Assuming you have a function to save the assignment data to the database
    const savedAssignment = await Assignment.create(data);
    return { savedAssignment };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error creating assignment in the database',
    );
  }
};
const getAllAssignementsByInstructorfromDB = async (req: Request) => {
  const { createdBy } = req.query;

  if (!createdBy) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'createdBy query parameter is required',
    );
  }

  try {
    const assignments = await Assignment.find({ createdBy });
    return { assignments };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error fetching assignments from the database',
    );
  }
};
export const AssignmentServices = {
  createAssignmentFileIntoDB,
  createAssignmentIntoDB,
  getAllAssignementsByInstructorfromDB,
};
