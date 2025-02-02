import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuizServices } from './quiz.service';

const createQuiz = catchAsync(async (req, res) => {
  const result = await QuizServices.createQuizIntoDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz uploaded successfully',
    data: result,
  });
});
const createQuestion = catchAsync(async (req, res) => {
  const result = await QuizServices.createQuestionOfQuiz(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'question uploaded successfully',
    data: result,
  });
});
const getAllQuestionsOfAIns = catchAsync(async (req, res) => {
  const result = await QuizServices.getallQuestionsOfAInsFromDB(req);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all questions retrieved successfully',
    data: result,
  });
});

export const QuizControllers = {
  createQuiz,
  createQuestion,
  getAllQuestionsOfAIns,
};
