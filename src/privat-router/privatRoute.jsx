import { Navigate } from 'react-router-dom';
import { useAuthInfo } from '../use context/useAuthInfo';

function PrivateRoute({ element, requiredRoles }) {
  const { userData, isLoading } = useAuthInfo();

  if (isLoading) {
    return null
  }

  if (!userData.role) {
    // Tidak ada informasi pengguna atau peran, mungkin perlu log masuk
    return <Navigate to="/login" />;
  }

  if (requiredRoles.includes(userData.role)) {
    // Pengguna memiliki peran yang sesuai
    return element;
  } else {
    // Pengguna tidak memiliki izin
    return <Navigate to="/unauthorized" />;
  }
}

export default PrivateRoute;
