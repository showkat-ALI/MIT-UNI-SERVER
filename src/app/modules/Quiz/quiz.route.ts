import express from 'express';
import auth from '../../middlewares/auth';
import { QuizControllers } from './quiz.controller';
import { QuizValidation } from './quiz.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-quiz',
  auth(['admin', 'superAdmin']),
  validateRequest(QuizValidation.createQuizValidation),
  QuizControllers.createQuiz,
);
router.post(
  '/create-question',
  auth(['admin', 'superAdmin']),
  QuizControllers.createQuestion,
);
router.get(
  '/all-question/:userID',
  auth(['admin', 'superAdmin']),
  QuizControllers.getAllQuestionsOfAIns,
);

export const QuizRoutes = router;
