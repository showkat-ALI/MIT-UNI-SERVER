import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get(
  '/:id',
  auth(['superAdmin', 'admin', 'faculty']),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  auth(['superAdmin', 'admin']),
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',
  auth(['superAdmin', 'admin']),
  FacultyControllers.deleteFaculty,
);

router.get(
  '/',
  auth(['superAdmin', 'admin', 'faculty']),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
