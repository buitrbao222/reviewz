import { Navigate, useLocation } from 'react-router-dom';
import useStore from 'store/store';

export default function RequireAuth(props) {
  const { children } = props;

  const user = useStore(store => store.user);

  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
