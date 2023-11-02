import { Navigate } from 'react-router-dom';
import { useAuthInfo } from '../use context/useAuthInfo';
import { useEffect, useState } from 'react';
import { LoadingScreen } from '../component/loading screen/loadingScreen';

function PrivateRoute({ element, requiredRoles }) {
  const { userData, validToken } = useAuthInfo();
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (userData?.role) {
      setUserLoaded(true);
    }
  }, [userData?.role]);

  if (!validToken) {
    return <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-24 bg-rose-600 text-red'>
      Your session has ended
    </div>
  }

  if (!validToken) {
    return <Navigate to="/login" />;
  }
  if (!isUserLoaded) {
    // Tunggu hingga userInfo terload
    return <LoadingScreen />
  }
  if (requiredRoles.includes(userData?.role)) {
    // Pengguna memiliki peran yang sesuai
    return element;
  } else {
    // Pengguna tidak memiliki izin
    return <Navigate to="/unauthorized" />;
  }
}

export default PrivateRoute;
