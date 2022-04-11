import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from 'store/userStore';

export default function RequireAuth(props) {
  const { children } = props;

  const user = useUserStore(store => store.user);

  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
