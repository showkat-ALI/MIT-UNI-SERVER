import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { updateStudentValidationSchema } from './student.validation';

const router = express.Router();

router.get(
  '/',
  auth(['superAdmin', 'admin']),
  StudentControllers.getAllStudents,
);

router.get(
  '/:id',
  auth(['superAdmin', 'admin', 'faculty']),
  StudentControllers.getSingleStudent,
);

router.patch(
  '/:id',
  auth(['superAdmin', 'admin']),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete(
  '/:id',
  auth(['superAdmin', 'admin']),
  StudentControllers.deleteStudent,
);

export const StudentRoutes = router;
