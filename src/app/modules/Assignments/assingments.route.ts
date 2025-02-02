import express from 'express';
import auth from '../../middlewares/auth';
// import validateRequest from '../../middlewares/validateRequest';
import { AssignmentControllers } from './assignments.controller';
import { AssignmentValidation } from './assingments.validation';
import validateRequest from '../../middlewares/validateRequest';
import { minioUpload } from '../../minio-config/minioConfig';
// import { CourseValidations } from './assingments.validation';

const router = express.Router();

router.post(
  '/upload/upload-any-file',
  auth(['admin', 'superAdmin']),
  minioUpload.single('file'),
  // validateRequest(CourseValidations.createCourseValidationSchema),
  AssignmentControllers.uploadFile,
);
router.post(
  '/create-assignment',
  auth(['admin', 'superAdmin']),
  validateRequest(AssignmentValidation.createAssignmentValidation),
  AssignmentControllers.createAssignment,
);
router.get(
  '/all-assignments',
  auth(['admin', 'superAdmin']),
  AssignmentControllers.getAssignmentsByInstructor,
);

export const AssignmentRoutes = router;
