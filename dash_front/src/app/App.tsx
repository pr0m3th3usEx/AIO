import { FC, useEffect } from 'react';
import { useGetUserQuery } from 'services/user';
import { setIsAuth } from 'store/auth.slice';
import { setUser } from 'store/user.slice';
import { useAppDispatch } from 'utils/hooks';
import AppRoutes from './AppRoutes';

const UserFetch: FC = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery();

  useEffect(() => {
    if (!isLoading && isSuccess) {
      if (data) {
        dispatch(setIsAuth(true));
        dispatch(setUser(data));
      }
    }
    if (!isLoading && isError) {
      dispatch(setIsAuth(false));
    }
  }, [dispatch, data, isLoading, isSuccess, isError, error]);

  return <></>;
};

function App() {
  return (
    <>
      <UserFetch />
      <AppRoutes />
    </>
  );
}

export default App;
