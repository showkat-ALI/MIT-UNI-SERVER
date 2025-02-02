import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(['superAdmin', 'admin']),
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);
router.post(
  '/assign-faculty/:academicFacultyID',
  auth(['superAdmin', 'admin']),

  AcademicFacultyControllers.assignAFaculty,
);

router.get(
  '/:id',
  auth(['admin', 'faculty', 'instructor', 'student', 'superAdmin']),
  AcademicFacultyControllers.getSingleAcademicFaculty,
);

router.patch(
  '/:id',
  auth(['admin', 'superAdmin']),
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get(
  '/',
  auth(['admin', 'faculty', 'instructor', 'student', 'superAdmin']),
  AcademicFacultyControllers.getAllAcademicFaculties,
);

export const AcademicFacultyRoutes = router;
