import { z } from 'zod';

export const adminCreationValidationSchema = z.object({
  body: z.object({
    faculty: z.object({
      AcademicFaculty: z
        .string({
          invalid_type_error: 'Faculty must be string',
        })

        .optional(),
    }),
  }),
});

export const AdminValidation = {
  adminCreationValidationSchema,
};
