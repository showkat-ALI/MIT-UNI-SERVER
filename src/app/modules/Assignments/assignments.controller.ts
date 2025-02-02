import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AssignmentServices } from './assingments.service';

const uploadFile = catchAsync(async (req, res) => {
  const result = await AssignmentServices.createAssignmentFileIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'File uploaded successfully',
    data: result,
  });
});
const createAssignment = catchAsync(async (req, res) => {
  const result = await AssignmentServices.createAssignmentIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Assignment uploaded successfully',
    data: result,
  });
});
const getAssignmentsByInstructor = catchAsync(async (req, res) => {
  const result =
    await AssignmentServices.getAllAssignementsByInstructorfromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Assignment retrived successfully',
    data: result,
  });
});

export const AssignmentControllers = {
  uploadFile,
  createAssignment,
  getAssignmentsByInstructor,
};
