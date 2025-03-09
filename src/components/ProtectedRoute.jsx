import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isRestaurantOwner } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole === 'restaurant_owner' && !isRestaurantOwner()) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute; 