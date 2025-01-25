import config from '../config';
import { User } from '../modules/user/user.model';

const superUser = {
  id: '0001',
  email: 'showkat.ali2634@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  roles: ['superAdmin'],
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({
    roles: { $in: ['superAdmin'] },
  });

  if (!isSuperAdminExits) {
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
