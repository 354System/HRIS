import { Navigate } from 'react-router-dom';
import { useAuthInfo } from '../use context/useAuthInfo';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '../component/loading screen/loadingScreen';
// import { useDataCurrentUser } from '../use context/useAllDataCurrentUser';

function PrivateRoute({ element, requiredRoles }) {
  const { userData, validToken } = useAuthInfo();
  // const { loading } = useDataCurrentUser();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (userData?.role) {
      setUserLoaded(true);
    }
  }, [userData?.role]);

  if (userData) {
    
  }
  if (!validToken) {
    return <Navigate to="/login" />;
  }
  if (!isUserLoaded) {
    // Tunggu hingga userInfo terload
    return <LoadingScreen />
  }
  // if (loading) {
  //   return <LoadingScreen />
  // }
  if (requiredRoles.includes(userData?.role)) {
    // Pengguna memiliki peran yang sesuai
    return element;
  } else {
    // Pengguna tidak memiliki izin
    return <Navigate to="/unauthorized" />;
  }
}

export default PrivateRoute;
