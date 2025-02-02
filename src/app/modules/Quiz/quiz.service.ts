import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

import { Request } from 'express';
import { Question, Quiz } from './quiz.model';

const createQuizIntoDB = async (req: Request) => {
  const data = req.body;
  try {
    // Assuming you have a function to save the assignment data to the database
    const savedQuiz = await Quiz.create(data);
    return { savedQuiz };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error creating quiz in the database',
    );
  }
};
const createQuestionOfQuiz = async (req: Request) => {
  const data = req.body;
  try {
    // Assuming you have a function to save the assignment data to the database
    const quiz = await Quiz.findById({ _id: data.quiz });
    if (!quiz) {
      throw new AppError(httpStatus.NOT_FOUND, 'Quiz not found');
    }
    if (quiz) {
      const savedQuestion = await Question.create(data);

      return { savedQuestion };
    }
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error creating Question in the database',
    );
  }
};
const getallQuestionsOfAInsFromDB = async (req: Request) => {
  const data = req.body;
  const userID = req.params;
  try {
    // Assuming you have a function to save the assignment data to the database
    const question = await Question.find();
    const Quizzes = await Quiz.find();
    const userQuizzes = Quizzes.filter(
      (quiz) => quiz.createdBy.toString() === userID.toString(),
    );
    if (!question) {
      throw new AppError(httpStatus.NOT_FOUND, 'Questions not found');
    }

    return { userQuizzes };
  } catch (error) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error creating Question in the database',
    );
  }
};

export const QuizServices = {
  createQuizIntoDB,
  createQuestionOfQuiz,
  getallQuestionsOfAInsFromDB,
};
