import { Navigate } from 'react-router-dom';
import { useUserInfo } from '../use context/user-info';

function PrivateRoute({ element, requiredRoles }) {
  const { userInfo } = useUserInfo();

  if (!userInfo || !userInfo.role) {
    // Tidak ada informasi pengguna atau peran, mungkin perlu log masuk
    return <Navigate to="/login" />;
  }

  if (requiredRoles.includes(userInfo.role)) {
    // Pengguna memiliki peran yang sesuai
    return element;
  } else {
    // Pengguna tidak memiliki izin
    return <Navigate to="/unauthorized" />;
  }
}

export default PrivateRoute;
