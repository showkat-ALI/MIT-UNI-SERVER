import { z } from 'zod';

const createAssignmentValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    fileUrl: z.string(),
    comment: z.string().optional(),
    score: z.string(),
    availFrom: z.string(),
    availUntil: z.string(),
    createdBy: z.string().optional(),
    submissionAttempts: z.string(),
  }),
});

export const AssignmentValidation = {
  createAssignmentValidation,
};
