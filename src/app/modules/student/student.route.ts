import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/:studentId', StudentControllers.getSingleStudent);

router.delete('/:studentId', StudentControllers.deleteStudent);

router.get('/', StudentControllers.getAllStudents);
router.put('/:studentId', StudentControllers.updateStudent);

export const StudentRoutes = router;
