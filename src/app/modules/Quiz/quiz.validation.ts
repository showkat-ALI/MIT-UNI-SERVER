import { z } from 'zod';

const createQuizValidation = z.object({
  body: z.object({
    attempts: z.string(),
    isRequired: z.boolean(),
    isSort: z.boolean(),
    questionPerPage: z.string(),
    scorePerQuestion: z.string(),
    startDate: z.string(),
    startTime: z.string(),
    timeAllowed: z.string(),
    title: z.string(),
    type: z.string(),
    createdBy: z.string(),
  }),
});

export const QuizValidation = {
  createQuizValidation,
};
