import { USER_ROLES } from 'configs/constants';

export default function isAdmin(user) {
  return user.roles.some(({ role }) => role === USER_ROLES.ADMIN);
}
