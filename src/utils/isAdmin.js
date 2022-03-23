export default function userIsAdmin(user) {
  return user.roles.some(({ role }) => role === 'ROLE_ADMIN');
}
