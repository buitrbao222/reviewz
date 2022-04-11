import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from 'store/userStore';
import isAdmin from 'utils/isAdmin';

export default function RequireAdmin(props) {
  const { children } = props;

  const user = useUserStore(store => store.user);

  const location = useLocation();

  if (!user || !isAdmin(user)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
