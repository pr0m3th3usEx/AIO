import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'utils/hooks';

const PrivateRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }
  return children;
};

export default PrivateRoute;
