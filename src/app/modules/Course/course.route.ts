import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CourseControllers } from './course.controller';
import { CourseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  auth(['admin', 'superAdmin']),
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

router.get(
  '/:id',
  auth(['admin', 'faculty', 'instructor', 'student', 'superAdmin']),
  CourseControllers.getSingleCourse,
);

router.patch(
  '/:id',
  auth(['superAdmin', 'admin']),
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

router.delete(
  '/:id',
  auth(['admin', 'superAdmin']),
  CourseControllers.deleteCourse,
);

router.put(
  '/:courseId/assign-faculties',
  auth(['admin', 'superAdmin']),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

router.get(
  '/:courseId/get-faculties',
  auth(['admin', 'faculty', 'instructor', 'student', 'superAdmin']),
  CourseControllers.getFacultiesWithCourse,
);

router.delete(
  '/:courseId/remove-faculties',
  auth(['admin', 'superAdmin']),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

router.get(
  '/',
  auth(['admin', 'faculty', 'instructor', 'student', 'superAdmin']),
  CourseControllers.getAllCourses,
);

export const CourseRoutes = router;
