import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/', auth(['superAdmin']), AdminControllers.getAllAdmins);

router.get(
  '/:id',
  auth(['superAdmin', 'admin']),
  AdminControllers.getSingleAdmin,
);

router.patch(
  '/:id',
  auth(['superAdmin', 'admin']),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);
router.post(
  '/assignDepartment/:id',
  auth(['superAdmin']),
  AdminControllers.assignAdminIntoDept,
);

router.delete('/:adminId', auth(['superAdmin']), AdminControllers.deleteAdmin);

export const AdminRoutes = router;
